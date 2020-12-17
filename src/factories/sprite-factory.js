/**
 * The MIT License (MIT)
 *
 * Igor Zinken 2020 - https://www.igorski.nl
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { sprite } from "zcanvas";
import DrawableLayer from "@/components/ui/zcanvas/drawable-layer";
import { LAYER_IMAGE, LAYER_GRAPHIC, LAYER_MASK } from "@/definitions/layer-types";

/**
 * Sprites are used to represent layer content. These are mapped
 * to the layer ids (see layer-factory.js)
 */
const spriteCache = new Map();

/**
 * Runs given fn on each Sprite in the cache
 */
export const runSpriteFn = fn => {
    spriteCache.forEach( fn );
};

/**
 * If a layer were to be removed / set to invisible, we
 * flush all its cached Sprites.
 */
export const flushLayerSprites = ({ id }) => {
    console.warn( `flushing sprite for "${id}"` );
    if ( hasSpriteForLayer({ id })) {
        disposeSprite( spriteCache.get( id ));
        spriteCache.delete( id );
    }
};

export const hasSpriteForLayer = ({ id }) => {
    return spriteCache.has( id );
};

/**
 * Clears the entire cache and disposes all Sprites.
 */
export const flushCache = () => {
    console.warn( "flushing sprite cache" );
    spriteCache.forEach( disposeSprite );
    spriteCache.clear();
};

/**
 * Lazily retrieve / create a cached sprite to represent given
 * layer content on given zCanvas instance
 */
export const createSpriteForLayer = ( zCanvasInstance, layer, isInteractive = false ) => {
    const { id, type, bitmap, x, y, width, height } = layer;
    let output;
    if ( hasSpriteForLayer( layer )) {
        output = spriteCache.get( id );
    }
    // lazily create sprite
    if ( !output ) {
        switch ( type ) {
            default:
            case LAYER_GRAPHIC:
                output = new DrawableLayer( layer );
                break;
            case LAYER_IMAGE:
                output = new sprite({ bitmap, x, y, width, height });
                break;
        }
        output.setDraggable( true );
        output.setInteractive( isInteractive );
        zCanvasInstance.addChild( output );
        spriteCache.set( id, output );
    }
    return output;
};

/* internal methods */

function disposeSprite( sprite ) {
    console.warn( "disposing sprite" );
    sprite?.dispose();
    // TODO: also free associated bitmap ?
}
