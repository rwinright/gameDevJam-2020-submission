//An assorted assortment of helpful helper functions to help you clean up your classy classes.

export default function Helpers() {
  let generateAnimations = (frames: any, scene: any, textureKey: any,  frameNameOverride?: any) => {
    frames.forEach((frame: any) => {

      let generatedFrames = scene.anims.generateFrameNames(textureKey, {
        start: frame.start,
        end: frame.end,
        prefix: `${frame.frameName}-`,
        suffix: '.png'
      });

      scene.anims.create({
        key: frame.frameNameOverride ? frame.frameNameOverride : frame.frameName,
        frames: generatedFrames,
        frameRate: 10,
        repeat: frame.repeat
      });
    });

  }

  return ({
    generateAnimations
  })
}