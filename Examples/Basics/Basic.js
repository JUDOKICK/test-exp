import ExpoPixi from 'expo-pixi';

export default async context => {
  //http://pixijs.io/examples/#/basics/basic.js
  const app = ExpoPixi.application({
    context,
  });
  const bunny = await ExpoPixi.spriteAsync(require('../../assets/pixi/bunny.png'));

  bunny.width = bunny.height = 20;
  // center the sprite's anchor point
  bunny.anchor.set(0.5);

  // move the sprite to the center of the screen
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  app.stage.addChild(bunny);
  app.stage.interactive = true;
   app.renderer.plugins.interaction.on( 'mousedown', function() { console.log('mousedown') } );

  // Listen for animate update
  app.ticker.add(delta => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent tranformation
    bunny.rotation += 0.1 * delta;
  });
};
