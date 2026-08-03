import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the FAQ page
        await page.goto('http://localhost:3000/faq')
        await page.wait_for_selector('input[placeholder*="Search questions"]')

        # Check for errors in the UI
        print(await page.content())

        await browser.close()

asyncio.run(main())
