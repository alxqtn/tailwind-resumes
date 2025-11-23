# Web to PDF Generator

As a fullstack developer, my best designing tool is CSS. So I find it pretty useful to be able to generate slick-looking PDFs from code.

I mostly use this to design and generate résumés for me and my close ones (mine is available as an example), but this could easily be used for any other kind of document (I'd initially researched PDF generation options for billing).

## Tools Used

- **Puppeteer**: Headless browser. Does the actual rendering and PDF generation.
- **Pug**: It's not for everyone, but for quick templating I find the language more suitable and readable than HTML.
- **Tailwind CSS**: I use for all my front-end projects, I find it's the best of both worlds. You're still using CSS logic as any class only does one thing, but it's much quicker to type and you can do it in the same file.


## CLI Usage

1. Create a new folder under data, let's name it `example`
2. Create a file called `template.pug` in the `example` folder and type in your pug template (try `p Hello #{name}` if needed). If needing to add CSS you can check out how I did it in the already provided folder.
3. Create a `contents.json` file in the same folder to input your data. Try `{"name": "Alix"}` as an example
4. From the main project folder, run `yarn cli example` (or use npm). If dependencies are properly installed, this should output a `result.pdf` in the `examples` folder with "Hello Alix" and any change detected in the project while the command is running will overwrite the file.

### Assets

To use images in your templates, place them in `/data/assets/` (supports jpg, png, svg). Then run:

```bash
node encode-assets.js
```

This generates `assets.json` with base64-encoded assets. Reference them in your Pug template with `assets.filename` (without extension). For example, `background-image: url("#{assets.pattern}")` if you have a `pattern.jpg` file.

### Internationalisation

For my own resume, which I needed in both French and English, I added a quick support for internationalisation.

If you want to use the same template for several languages, you can create several contents files with a locale prefix, run the command `yarn cli example en` (providing the locale prefix as a second argument) and this will read from file `contents.en.json` and output in file `result.en.pdf`.

## GitIgnore

Right now, any folder you create in the data folder will not be committed. That's because I don't want to commit my own local folders. To change this behavior, update the `.gitignore` to remove these lines:

```
/data/*
!/data/alix
```
