import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio
} from 'react-native';
import Expo from 'expo';
import ExpoPixi from 'expo-pixi';
import {
  Button
} from 'react-native-elements';

import './global';

const {
  width,
  height
} = Dimensions.get('window');
const scale = PixelRatio.get();


const colorMatrix = [{
    name: 'reset'
  },
  {
    name: 'brightness',
    tools: [{
      type: 'number',
      min: 0,
      max: 1,
      standard: 0.3
    }],
  },
  {
    name: 'greyscale',
    tools: [{
      type: 'number',
      min: 0,
      max: 1,
      standard: 0.6
    }],
  },
  {
    name: 'blackAndWhite'
  },
  {
    name: 'hue',
    tools: [{
      type: 'number',
      min: 0,
      max: 360,
      standard: 180
    }]
  },
  {
    name: 'contrast',
    tools: [{
      type: 'number',
      min: 0,
      max: 1,
      standard: 0.8
    }],
  },
  {
    name: 'saturate',
    tools: [{
      type: 'number',
      min: 0,
      max: 1,
      standard: 0.8
    }],
  },
  {
    name: 'desaturate'
  },
  {
    name: 'negative'
  },
  {
    name: 'sepia'
  },
  {
    name: 'technicolor',
    tools: [{
      type: 'boolean',
      standard: true
    }]
  },
  {
    name: 'polaroid'
  },
  {
    name: 'toBGR'
  },
  {
    name: 'kodachrome',
    tools: [{
      type: 'boolean',
      standard: true
    }]
  },
  {
    name: 'browni',
    tools: [{
      type: 'boolean',
      standard: true
    }]
  },
  {
    name: 'vintage',
    tools: [{
      type: 'boolean',
      standard: true
    }]
  },
  {
    name: 'colorTone',
    tools: [{
        type: 'number',
        min: 0,
        max: 1,
        standard: 0.5
      },
      {
        type: 'number',
        min: 0,
        max: 1,
        standard: 0.5
      },
      {
        type: 'color',
        standard: 0xff0000
      },
      {
        type: 'color',
        standard: 0x000011
      },
    ],
  },
  {
    name: 'night',
    tools: [{
      type: 'number',
      min: 0,
      max: 1,
      standard: 0.5
    }]
  },
  {
    name: 'predator',
    tools: [{
      type: 'number',
      min: 0,
      max: 1,
      standard: 0.5
    }],
  },
  {
    name: 'lsd'
  },
];

export default class App extends React.Component {
  state = {
    index: 0,
  };
  web3 = null;
  componentWillMount() {


    const Web3 = require('web3');
    web3 = new Web3(
      new Web3.providers.HttpProvider('https://mainnet.infura.io/'));

  
    

    const filter = filters => {
      const output = new PIXI.filters.ColorMatrixFilter();
      if (Array.isArray(filters)) {
        filters.map(item => {
          if (typeof item === 'string') {
            output[item]();
          } else {
            const {
              name,
              props
            } = item;
            output[name](...props);
          }
        });
      } else {
        return filter([filters]);
      }
      return output;
    };

    const parsedColorMatrix = colorMatrix.map(({
      name,
      tools
    }) => {
      return filter({
        name: name,
        props: (tools || []).map(tool => tool.standard),
      });
    });

    this.filters = [
      new PIXI.filters.ColorReplaceFilter(0x000000, 0xff0000),
      new PIXI.filters.DotFilter(0.5),
      new PIXI.filters.EmbossFilter(),
      new PIXI.filters.PixelateFilter(),
      new PIXI.filters.CrossHatchFilter(),
      new PIXI.filters.NoiseFilter(),
      new PIXI.filters.OldFilmFilter(),
      new PIXI.filters.RGBSplitFilter(),

      new PIXI.filters.GlowFilter(30, 2, 0.5, 0xff0000),
      new PIXI.filters.BulgePinchFilter([0.5, 0.2], 300, 1),
      new PIXI.filters.MotionBlurFilter([54, 40], 15, 0),
      new PIXI.filters.DropShadowFilter(),
      new PIXI.filters.RadialBlurFilter(45, [width * scale / 2, height * scale / 2], 8, width),
      new PIXI.filters.AdvancedBloomFilter(),
      new PIXI.filters.BlurFilter(),
      new PIXI.filters.TwistFilter(400, 4, 20),
      new PIXI.filters.BloomFilter(),
      new PIXI.filters.OutlineFilter(20, 0x00fc00, 1),
      new PIXI.filters.ZoomBlurFilter(),

      // new PIXI.filters.AlphaFilter(),
      // new PIXI.filters.AsciiFilter(),
      // new PIXI.filters.ConvolutionFilter(),
      // new PIXI.filters.DisplacementFilter(),
      // new PIXI.filters.TiltShiftFilter(),
      // new PIXI.filters.GodrayFilter(),
      // new PIXI.filters.SimpleLightmapFilter(),
      // new PIXI.filters.MultiColorReplaceFilter(),
      // new PIXI.filters.ShockwaveFilter(),

      ...parsedColorMatrix,
    ];
  }



  render() {
 const filter = this.filters[this.state.index];
    return ( <
      View style = {
        styles.container
      } >
      <Button
        raised
        icon={{ name: 'home', size: 32 }}
        buttonStyle={{ backgroundColor: '#ff4f00', borderRadius: 10 }}
        textStyle={{ textAlign: 'center' }}
        title={`Welcome to\nReact Native Elements`}
      />
      <
      TouchableOpacity style = {
        styles.touchable
      }
      onPress = {
        () => {
          console.log(this.state.index,'-----------------')
       //   web3.eth.getBlock('latest').then(console.log);
          console.log(web3, '------ ming --------')
          console.log('pixi filters', PIXI.filters);
          const index = (this.state.index + 1) % this.filters.length;
          this.setState({
            index,
          });
        }
      } >

      <
      Expo.GLView style = {
        {
          flex: 1 
        }
      }
      onContextCreate = {
        async context => {
          const app = ExpoPixi.application({
            context
          });
          const sprite = await ExpoPixi.spriteAsync('http://i.imgur.com/uwrbErh.png');
          app.stage.addChild(sprite);
        }
      }
      /> 
        < ExpoPixi.FilterImage
        source = {
          require('./assets/ming.jpg')
        }
        resizeMode = {
          'cover'
        }
        style = {
          styles.image
        }
        filters = {
          filter
        }
        />
      < /
      TouchableOpacity > <
      /View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  touchable: {
    flex: 1,
    backgroundColor: 'green',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
});
