export default `<!doctype html>
<html lang="en" with-selection-styled>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Web Scraper · By Adam Schwartz · Powered by Cloudflare Workers®</title>

    <meta name="description" content="A simple web scraper powered by Cloudflare Workers®.">
    <meta name="keywords" content="Web scraper, screen scraper, scraper, Cloudflare Workers®, app">
    <meta name="author" content="Adam Schwartz">
    <meta name="generator" content="Adam Schwartz">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Web Scraper">
    <meta property="og:description" content="A simple web scraper powered by Cloudflare Workers®.">
    <meta property="og:url" content="https://web.scraper.workers.dev">

    <meta name="twitter:site" content="@adamfschwartz">
    <meta name="twitter:creator" content="@adamfschwartz">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Web Scraper">
    <meta name="twitter:description" content="A simple web scraper powered by Cloudflare Workers®.">
    <meta name="twitter:url" content="https://web.scraper.workers.dev">

    <link href="https://ui.components.workers.dev/?helpers=with-selection-styled,is-smooth-scrolling&components=Link,Button,FormField,Input,Checkbox,Radio,Stack,Row,Dialog" rel="stylesheet">
    <!-- focus-visible & dialog scripts omitted for brevity -->
    <style>
      /* styles omitted for brevity */
    </style>
  </head>

  <body>
    <div class="Surface">
      <div class="Panel">
        <div class="Panel--top">
          <h1><a href="https://web.scraper.workers.dev" class="Link Link-without-underline"><span class="WebScraperLogo"><span>web.scraper</span><span class="WebScraperLogo--muted">.workers.dev</span></span></a></h1>
          <button data-js-dialog-open class="Button Button-is-help Button-is-bordered" type="button" aria-label="Help">?</button>
        </div>

        <main class="Panel--main" is-smooth-scrolling>
          <form id="form" class="Stack" method="GET" action="https://web.scraper.workers.dev">
            <!-- URL -->
            <div class="FormField">
              <div class="FormField--text">
                <label class="FormField--label" for="url">URL</label>
              </div>
              <input class="Input" is-pristine id="url" type="text" inputmode="url" name="url" pattern="(?:(?:https?):\\/\\/)?(?:[\\w-]+\\.)+[\\w-]+(?::\\d+)?(?:\\/\\S*)?" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" required autofocus />
            </div>

            <!-- Selector -->
            <div class="FormField">
              <div class="FormField--text">
                <label class="FormField--label" for="selector">Selector</label>
              </div>
              <input class="Input" is-pristine id="selector" type="text" name="selector" pattern="(?:\\*|[#.]?[\\w-]+)(?:\$begin:math:display$\\\\S.*=\\\\S.*\\$end:math:display$)?(?::\\S*)?(?:\\s*(?:,|>)\\s*(?:\\*|\\.?[\\w-]+)(?:\$begin:math:display$\\\\S.*~?\\\\^?=\\\\S.*\\$end:math:display$)?(?::\\S*)?)*" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" required />
            </div>

            <!-- Scrape mode -->
            <div class="FormField">
              <div class="Radio---list">
                <div class="Radio">
                  <input class="Radio--input" type="radio" name="scrape" id="scrape-text" value="text" checked/>
                  <label class="Radio--label" for="scrape-text">Scrape the text contents of matched nodes</label>
                </div>
                <div class="Radio">
                  <input class="Radio--input" type="radio" name="scrape" id="scrape-attr" value="attr"/>
                  <label class="Radio--label" for="scrape-attr">Scrape an attribute from the last matched node</label>
                </div>
              </div>
            </div>

            <!-- Spaced (text mode) -->
            <div class="FormField" show-if-scrape="text">
              <div class="Checkbox">
                <input class="Checkbox--input" type="checkbox" name="spaced" id="spaced"/>
                <label class="Checkbox--label" for="spaced">Add a space between children of matched nodes</label>
              </div>
            </div>

            <!-- Attribute (attr mode) -->
            <div class="FormField" show-if-scrape="attr" is-hidden>
              <div class="FormField--text">
                <label class="FormField--label" for="attr">Attribute</label>
              </div>
              <input class="Input" is-pristine id="attr" type="text" name="attr" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>

            <!-- Pretty JSON -->
            <div class="FormField">
              <div class="Checkbox">
                <input class="Checkbox--input" type="checkbox" name="pretty" id="pretty" checked/>
                <label class="Checkbox--label" for="pretty">Prettify the JSON output</label>
              </div>
            </div>

            <!-- Pagination (optional) -->
            <hr/>
            <div class="FormField">
              <div class="FormField--text">
                <label class="FormField--label"><strong>Pagination (optional)</strong></label>
              </div>
            </div>
            <div class="FormField">
              <div class="FormField--text">
                <label class="FormField--label" for="pages">Pages to scrape</label>
              </div>
              <input class="Input" is-pristine id="pages" type="number" name="pages" min="1" inputmode="numeric" pattern="\\d*" />
            </div>
            <div class="FormField">
              <div class="FormField--text">
                <label class="FormField--label" for="pageParam">Page param name</label>
              </div>
              <input class="Input" is-pristine id="pageParam" type="text" name="pageParam" value="page" />
            </div>
            <div class="FormField">
              <div class="FormField--text">
                <label class="FormField--label" for="startPage">Start page</label>
              </div>
              <input class="Input" is-pristine id="startPage" type="number" name="startPage" min="1" value="1" inputmode="numeric" pattern="\\d*" />
            </div>

          </form>
        </main>

        <div class="Panel--bottom">
          <div class="Row">
            <button class="Button Button-is-primary" type="submit" form="form"><span class="desktop-only">Update preview</span><span class="mobile-only">Scrape</span></button>
            <a data-js-permalink href="https://web.scraper.workers.dev" class="Button Button-is-bordered" type="button">Permalink</a>
          </div>
        </div>
      </div>

      <figure class="Preview">
        <pre class="CodeBlock"><code class="CodeBlock--code" language="json" data-js-json-preview></code></pre>
      </figure>
    </div>

    <!-- dialogs and scripts unchanged -->
  </body>
</html>`
