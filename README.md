ICSSID 2026 — CMS-Enabled Conference Site

What I built
- A complete static site scaffold implementing the sections requested in `todo.txt` (Home, About, Themes, Key Dates, Committees, CFP, Registration, Venue, Nearby Hotels, Contact).
- Responsive, accessible HTML/CSS/JS with brand palette and simple hotel directory that reads `assets/data/hotels.json`.
- JSON-LD Event added to `index.html`.
- **NEW:** Full Content Management System (CMS) integration using Jekyll and Netlify CMS for editable content.

## CMS Features
- **Web-based Content Editor:** Edit text, images, and content through a user-friendly web interface
- **No Code Changes Required:** Non-technical users can update content without touching code
- **Version Control:** All changes tracked in Git with deployment automation
- **Media Management:** Upload and manage images directly through the CMS
- **Live Preview:** See changes before publishing

## How to run locally (Windows / XAMPP)
1. Using XAMPP: copy the folder into your Apache `htdocs` (already placed at the repo root). Open: http://localhost/ICSSID%20Conference/index.html
2. Or use PHP built-in server (from PowerShell) for quick test:

```powershell
cd 'c:\xampp\htdocs\ieee\ICSSID Conference'
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## CMS Development Setup
For local CMS development with Jekyll:

1. Install Ruby and Jekyll:
```powershell
# Install Ruby (if not already installed)
# Then install Jekyll and Bundler
gem install jekyll bundler
```

2. Install dependencies:
```powershell
cd 'c:\xampp\htdocs\ieee\ICSSID Conference'
bundle install
```

3. Run Jekyll server:
```powershell
bundle exec jekyll serve
```

4. Access the site at http://localhost:4000
5. Access the CMS admin at http://localhost:4000/admin

## Deployment to Netlify
1. Push this repository to GitHub
2. Connect your GitHub repo to Netlify
3. Enable Netlify Identity for authentication
4. Access the CMS at https://yoursite.netlify.app/admin

## Content Editing
- **Conference Info:** Edit conference name, description, dates, location in `_data/conference.yml`
- **Navigation:** Update menu items in `_data/navigation.yml`
- **Pages:** Edit page content through the CMS admin interface
- **Images:** Upload and manage images through the media library

## Files Structure
### Original Static Files
- `index.html`, `about.html`, `themes.html`, `keydates.html`, `committees.html`, `call-for-papers.html`, `registration.html`, `venue.html`, `hotels.html`, `contact.html`
- `assets/css/style.css`, `assets/js/main.js`, `assets/js/hotels.js`, `assets/data/hotels.json`

### CMS Files Added
- `_config.yml` - Jekyll configuration with Netlify CMS setup
- `_data/conference.yml` - Conference information data
- `_data/navigation.yml` - Navigation menu data
- `admin/index.html` - Netlify CMS admin interface
- `Gemfile` - Ruby dependencies for Jekyll
- `netlify.toml` - Deployment configuration
- `assets/js/content-editor.js` - Local content editor script

Notes & next steps
- Replace placeholder links (submission portal, registration, CFP PDF, organizer URL) with real URLs.
- Improve SEO images, add real hero photo with subtle overlay, and provide accessible map embed.
- I kept JS minimal and dependency-free for fast performance.
- The CMS is now ready for content editing without code changes.
