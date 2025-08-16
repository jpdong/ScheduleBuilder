import { test, expect } from '@playwright/test';

test.describe('Apple Schedule Page Button Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the apple-schedule page
    await page.goto('http://localhost:3003/apple-schedule');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to apple-schedule page and check if it loads', async ({ page }) => {
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Schedule Builder/i);
    
    // Check if the main component is present
    await expect(page.locator('.apple-schedule-builder')).toBeVisible();
  });

  test('should check navigation buttons functionality', async ({ page }) => {
    // Test previous day button
    const prevButton = page.locator('.apple-nav-button').first();
    await expect(prevButton).toBeVisible();
    
    console.log('Testing previous day button...');
    await prevButton.click();
    
    // Test next day button  
    const nextButton = page.locator('.apple-nav-button').last();
    await expect(nextButton).toBeVisible();
    
    console.log('Testing next day button...');
    await nextButton.click();
  });

  test('should check New event button functionality', async ({ page }) => {
    // Test the "New" button
    const newButton = page.locator('.apple-add-button');
    await expect(newButton).toBeVisible();
    
    console.log('Testing New event button...');
    await newButton.click();
    
    // Check if modal opens
    await page.waitForTimeout(1000);
    const modal = page.locator('.apple-create-modal, [role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test('should check view tab buttons functionality', async ({ page }) => {
    // Test Day tab button
    const dayButton = page.locator('.apple-tab-button').filter({ hasText: 'Day' });
    await expect(dayButton).toBeVisible();
    
    console.log('Testing Day tab button...');
    await dayButton.click();
    await expect(dayButton).toHaveClass(/active/);
    
    // Test Week tab button
    const weekButton = page.locator('.apple-tab-button').filter({ hasText: 'Week' });
    await expect(weekButton).toBeVisible();
    
    console.log('Testing Week tab button...');
    await weekButton.click();
    await expect(weekButton).toHaveClass(/active/);
    
    // Test Month tab button
    const monthButton = page.locator('.apple-tab-button').filter({ hasText: 'Month' });
    await expect(monthButton).toBeVisible();
    
    console.log('Testing Month tab button...');
    await monthButton.click();
    await expect(monthButton).toHaveClass(/active/);
  });

  test('should check time slot click functionality', async ({ page }) => {
    // Ensure we're in Day view
    const dayButton = page.locator('.apple-tab-button').filter({ hasText: 'Day' });
    await dayButton.click();
    
    // Find a time slot and click it
    const timeSlot = page.locator('.apple-time-content').first();
    await expect(timeSlot).toBeVisible();
    
    console.log('Testing time slot click...');
    await timeSlot.click();
    
    // Check if modal opens
    await page.waitForTimeout(1000);
    const modal = page.locator('.apple-create-modal, [role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test('should inspect button element properties', async ({ page }) => {
    // Check if buttons have proper attributes and are not disabled
    const allButtons = page.locator('button');
    const buttonCount = await allButtons.count();
    
    console.log(`Found ${buttonCount} buttons on the page`);
    
    for (let i = 0; i < buttonCount; i++) {
      const button = allButtons.nth(i);
      const isVisible = await button.isVisible();
      const isEnabled = await button.isEnabled();
      const buttonText = await button.textContent();
      const buttonClass = await button.getAttribute('class');
      
      console.log(`Button ${i + 1}: "${buttonText}" - Visible: ${isVisible}, Enabled: ${isEnabled}, Class: ${buttonClass}`);
      
      if (isVisible && isEnabled) {
        // Try to click each button to see if it responds
        try {
          await button.click({ timeout: 1000 });
          console.log(`Button ${i + 1} clicked successfully`);
        } catch (error) {
          console.log(`Button ${i + 1} click failed: ${error.message}`);
        }
      }
    }
  });

  test('should check for CSS overlays or pointer-events blocking', async ({ page }) => {
    // Check if any elements are blocking button clicks
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const buttonText = await button.textContent();
      
      // Check computed styles that might prevent clicking
      const pointerEvents = await button.evaluate(el => 
        window.getComputedStyle(el).pointerEvents
      );
      
      const zIndex = await button.evaluate(el => 
        window.getComputedStyle(el).zIndex
      );
      
      const position = await button.evaluate(el => 
        window.getComputedStyle(el).position
      );
      
      console.log(`Button "${buttonText}": pointer-events: ${pointerEvents}, z-index: ${zIndex}, position: ${position}`);
    }
  });

  test('should check for JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    // Try clicking various buttons
    await page.locator('.apple-add-button').click();
    await page.waitForTimeout(1000);
    
    if (errors.length > 0) {
      console.log('JavaScript errors found:', errors);
    } else {
      console.log('No JavaScript errors detected');
    }
    
    expect(errors.length).toBe(0);
  });
});