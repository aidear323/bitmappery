# PhotoMound

## So you are rebuilding Photoshop in the browser ?

No, I'm building a tool that does the bare minimum what I require and what I don't
find in other open source tools. That doesn't mean of course that contributions
related to Photoshop-esque features aren't welcomed.

## Dropbox integration

Requires you to [register a client id or access token](https://www.dropbox.com/developers/apps).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

# TODO / Roadmap

* Add layer view to options-panel: allow naming, repositioning, set as mask
* Drawable layers must be added to document (and thus be recalled when switching documents)
* Add brush options > size, transparency
* opening image as new layer doesn't do proper sizing
* scale logic should move from zoomable-canvas into zCanvas (as handleInteraction needs to transform offsets by zoom ratio, see drawable-layer!)
* adjust scaling (on widescreen images scale in the width, rather than go for full height and zoomed out mode)
* Default canvas background should be transparency blocks (requires zCanvas bg pattern update or just a lowest render layer that isn't part of the document)
* Zoom in should be center based
* Image position must be made persistent (now isn't on document switch)
* Implement selections
* Unload Blobs when images are no longer used in document (see canvas-util disposeSprite, keep instance count of usages)
* Export output to image file
* Import / export documents from/to disk|Dropbox
* Restore project by selecting folder from file system
* Use hand cursor when draggable
* Use paint brush cursor when painting
* Add tools for layer rotation and scaling
* Implement clone brush
* Implement document crop
* Implement change history
