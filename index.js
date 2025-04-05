import html from './html.js'
import contentTypes from './content-types.js'
import Scraper from './scraper.js'
import { generateJSONResponse, generateErrorJSONResponse } from './json-response.js'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const params = new URL(request.url).searchParams

  let url = params.get('url')
  if (url && !url.match(/^[a-zA-Z]+:\/\//)) url = 'http://' + url

  const selector  = params.get('selector')
  const attr      = params.get('attr')
  const spaced    = params.get('spaced')   // Adds spaces between tags
  const pretty    = params.get('pretty')
  const pages     = params.get('pages')    // e.g. pages=5
  const pageParam = params.get('pageParam') || 'page'
  const startPage = parseInt(params.get('startPage') || '1', 10)

  if (!url || !selector) {
    return handleSiteRequest(request)
  }

  return handleAPIRequest({ url, selector, attr, spaced, pretty, pages, pageParam, startPage })
}

async function handleSiteRequest(request) {
  const url = new URL(request.url)
  if (url.pathname === '/' || url.pathname === '') {
    return new Response(html, { headers: { 'content-type': contentTypes.html } })
  }
  return new Response('Not found', { status: 404 })
}

async function handleAPIRequest({ url, selector, attr, spaced, pretty, pages, pageParam, startPage }) {
  try {
    let allResults = []

    if (pages) {
      const pageCount = parseInt(pages, 10)
      const base = new URL(url)

      for (let i = 0; i < pageCount; i++) {
        base.searchParams.set(pageParam, startPage + i)
        const pageUrl = base.href

        const scraper = await new Scraper().fetch(pageUrl)
        // grab _all_ matches on this page
        const items = Array.from(
          await scraper.querySelectorAll(selector)
        ).map(el => {
          if (attr) return el.getAttribute(attr)
          return el.textContent.trim()
        }).filter(Boolean)

        allResults.push(...items)
      }
    } else {
      const scraper = await new Scraper().fetch(url)
      if (attr) {
        allResults = await scraper.querySelector(selector).getAttribute(attr)
      } else {
        allResults = await scraper.querySelector(selector).getText({ spaced })
      }
    }

    return generateJSONResponse({ result: allResults }, pretty)
  } catch (err) {
    return generateErrorJSONResponse(err, pretty)
  }
}
