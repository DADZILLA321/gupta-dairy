# Gupta Dairy – Netlify deploy

1. Is folder ko GitHub repo mein daalein (ya `netlify deploy --prod` CLI use karein). Netlify -> Add new site -> Import from Git.
   Note: drag-and-drop se Functions (dashboard) nahi chalte; baaki site chalegi.
2. Site settings -> Environment variables mein ye 3 add karein:
   - DASH_PASSWORD  = aapka dashboard password
   - NETLIFY_TOKEN  = User settings -> Applications -> Personal access tokens se banaya token
   - SITE_ID        = Site configuration -> Site ID
3. Redeploy karein.
4. ऑर्डर: Netlify -> Forms -> "order". Email alert ke liye Forms -> Form notifications -> Add email.
5. Dashboard: aapki-site.netlify.app/#dashboard (footer mein "दुकानदार लॉगिन").
