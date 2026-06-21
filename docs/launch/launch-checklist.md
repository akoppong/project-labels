# Launch Checklist

## User-Owned Actions

- Approve the launch plan.
- Create two Stripe Payment Links: $19.97 Export Pass and $24.97/month Pro.
- Connect the repo to Vercel or Netlify.
- Point a production domain if available.
- Approve or lightly edit the outreach copy before it is sent.

## Agent-Owned Actions

- Build and verify the app.
- Write Stripe setup instructions.
- Draft outreach templates.
- Draft community reply templates.
- Prepare the exact-match ad test.
- Prepare the daily scorecard.

## QA Pass After Package 3

Run this once now and again before deployment:

1. Open the local app.
2. Paste `sku,name,price` with `SKU-1001,Blue Shirt,24.00`.
3. Confirm the parsed table shows code, name, and price.
4. Paste `item,title` with `ABC-1,Canvas Tote`.
5. Confirm first-column fallback works.
6. Upload a CSV file.
7. Confirm the blank CSV error appears for empty input.
8. Confirm invalid newline code input is rejected.
9. Preview labels.
10. Export a watermarked preview PDF.
11. Visit `/?unlock=export-pass` and confirm clean export is unlocked.
12. Visit `/?unlock=pro` and confirm clean export is unlocked.
13. Visit the SEO pages.
14. Check the mobile layout.

## Pass Condition

- A cold user can understand the tool in 10 seconds, preview labels without signup, and reach the paid export moment without support.
