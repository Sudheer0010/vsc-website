import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Wait a bit for the server to be fully ready
        await asyncio.sleep(2)

        # Navigate to the FAQ page
        print("Navigating...")
        await page.goto('http://localhost:3000/faq')
        await page.wait_for_selector('input[placeholder*="Search questions"]')
        print("Page loaded")

        # Focus an accordion toggle and take a screenshot
        await page.focus('button[aria-controls]')
        await page.screenshot(path='faq_accordion_focused_fixed.png')

        # Check if there are any error overlays
        error_overlay = await page.query_selector('nextjs-portal')
        if error_overlay:
            print("Warning: Next.js dev overlay found in DOM")
            html = await page.evaluate('(el) => el.innerHTML', error_overlay)
            if 'Error' in html or 'ReferenceError' in html:
                print("Error found in overlay!")

        await browser.close()

asyncio.run(main())
