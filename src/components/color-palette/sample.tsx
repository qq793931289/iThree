import * as React from 'react';
import { ColorPalette } from '.';
import './style';
import json from './color.json';

function CatalogSample() {


    return (
        <div id='anchor-color-palette'>
            <dl>
                <p style={{ fontSize: '14px', color: '#434C5D ', marginTop: '-120px' }}>色卡</p>
                <dd style={{ width: 275, height: 850 }}>
                    <ColorPalette items={json} blockStyle={{ height: 35 }} />
                </dd>
            </dl>
        </div>
    );
}
export default {
    order: 20,
    comp: CatalogSample,
};