# Resume and Certificates PDF Generation

## Instructions

The portfolio website includes links to Resume and Certificates PDFs. Since these need to be in PDF format for the website to work properly, please follow these steps:

### Option 1: Print to PDF from Browser (Recommended)

1. **For Resume:**
   - Open: `file:///C:/Users/libin/Desktop/My New Portfolio/assets/resume.html`
   - Press `Ctrl + P` (Print)
   - Select "Save as PDF" or "Microsoft Print to PDF"
   - Save as: `Deransiya_Dorin_Resume.pdf` in the `assets` folder

2. **For Certificates:**
   - Open: `file:///C:/Users/libin/Desktop/My New Portfolio/assets/certificates.html`
   - Press `Ctrl + P` (Print)
   - Select "Save as PDF" or "Microsoft Print to PDF"
   - Save as: `Certificates.pdf` in the `assets` folder

### Option 2: Use Chrome Headless (If Chrome is installed)

Run these commands in PowerShell:

```powershell
# For Resume
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --print-to-pdf="C:\Users\libin\Desktop\My New Portfolio\assets\Deransiya_Dorin_Resume.pdf" "C:\Users\libin\Desktop\My New Portfolio\assets\resume.html"

# For Certificates  
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --print-to-pdf="C:\Users\libin\Desktop\My New Portfolio\assets\Certificates.pdf" "C:\Users\libin\Desktop\My New Portfolio\assets\certificates.html"
```

### Current Status

✅ HTML files created and ready for conversion
⏳ PDF files need to be generated using one of the methods above

Once the PDFs are created, the website will work perfectly with all download links functional!
