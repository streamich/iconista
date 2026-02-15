#!/usr/bin/env node
/**
 * Browser automation script for Iconista site testing.
 * Run with: npx playwright test browser-test.spec.mjs
 * Or: node browser-test.mjs (with playwright installed)
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:5174/';
const SCREENSHOT_DIR = join(process.cwd(), 'browser-test-screenshots');

async function main() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const logs = [];
  const log = (msg) => {
    logs.push(msg);
    console.log(msg);
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const consoleMessages = [];
  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({ type, text });
    if (type === 'error') log(`[CONSOLE ERROR] ${text}`);
  });

  try {
    // 1. Navigate to landing page
    log('\n=== 1. Navigating to landing page ===');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: join(SCREENSHOT_DIR, '01-landing.png'), fullPage: false });
    log('Screenshot: 01-landing.png');
    
    // Get hero text
    const heroText = await page.locator('h1').first().textContent().catch(() => null);
    log(`Hero: ${heroText?.trim() || 'N/A'}`);

    // 2. Scroll down to icon set cards
    log('\n=== 2. Scrolling to icon set cards ===');
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(SCREENSHOT_DIR, '02-set-cards.png'), fullPage: false });
    log('Screenshot: 02-set-cards.png');
    
    const setCardCount = await page.locator('.set-card').count();
    log(`Set cards visible: ${setCardCount}`);

    // 3. Click Lucide icon set
    log('\n=== 3. Clicking Lucide icon set ===');
    const lucideCard = page.locator('.set-card').filter({ hasText: 'Lucide' }).first();
    await lucideCard.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(SCREENSHOT_DIR, '03-lucide-grid.png'), fullPage: false });
    log('Screenshot: 03-lucide-grid.png');
    
    const gridHeader = await page.locator('h2').first().textContent().catch(() => null);
    const iconCount = await page.locator('.icon-card').count();
    log(`Grid header: ${gridHeader?.trim() || 'N/A'}`);
    log(`Icons visible: ${iconCount}`);

    // 4. Click first icon to open modal
    log('\n=== 4. Clicking first icon ===');
    await page.locator('.icon-card').first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(SCREENSHOT_DIR, '04-detail-modal.png'), fullPage: false });
    log('Screenshot: 04-detail-modal.png');
    
    const modalTitle = await page.locator('h2').first().textContent().catch(() => null);
    const hasTabs = await page.locator('button:has-text("React")').isVisible().catch(() => false);
    log(`Modal icon name: ${modalTitle?.trim() || 'N/A'}`);
    log(`Tabs visible: ${hasTabs}`);

    // 5. Close modal (click backdrop or X) and search
    log('\n=== 5. Closing modal, then searching "arrow" ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('');
    await searchInput.fill('arrow');
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(SCREENSHOT_DIR, '05-search-results.png'), fullPage: false });
    log('Screenshot: 05-search-results.png');
    
    const resultsText = await page.locator('p.text-sm.text-gray-500, p.text-sm.text-gray-400').first().textContent().catch(() => null);
    const searchIconCount = await page.locator('.icon-card').count();
    log(`Results summary: ${resultsText?.trim() || 'N/A'}`);
    log(`Icons in search results: ${searchIconCount}`);

  } catch (err) {
    log(`\nERROR: ${err.message}`);
    try {
      await page.screenshot({ path: join(SCREENSHOT_DIR, 'error.png') });
      log('Error screenshot saved.');
    } catch (_) {}
  } finally {
    await browser.close();
  }

  // Summary
  const errors = consoleMessages.filter((m) => m.type === 'error');
  log('\n=== Console errors ===');
  if (errors.length === 0) {
    log('None');
  } else {
    errors.forEach((e) => log(e.text));
  }

  writeFileSync(join(SCREENSHOT_DIR, 'report.txt'), logs.join('\n'), 'utf-8');
  log(`\nReport saved to ${SCREENSHOT_DIR}/report.txt`);
}

main().catch(console.error);
