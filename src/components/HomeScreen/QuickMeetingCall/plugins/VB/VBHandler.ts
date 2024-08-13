import { HMSEffectsPlugin, HMSVirtualBackgroundTypes } from '@100mslive/hms-virtual-background';

export class VBPlugin {
  private effectsPlugin?: HMSEffectsPlugin | undefined;

  initialisePlugin = (effectsSDKKey?: string) => {
    if (this.getVBObject()) {
      return;
    }
    if (effectsSDKKey) {
      this.effectsPlugin = new HMSEffectsPlugin(effectsSDKKey);
    }
  };

  getBackground = () => {
    return this.effectsPlugin?.getBackground();
  };

  getBlurAmount = () => {
    return this.effectsPlugin?.getBlurAmount();
  };

  getVBObject = () => {
    return this.effectsPlugin;
  };

  getName = () => {
    return this.effectsPlugin?.getName();
  };

  setBlur = async (blurPower: number) => {
    this.effectsPlugin?.setBlur(blurPower);
  };

  setBackground = async (mediaURL: string) => {
    this.effectsPlugin?.setBackground(mediaURL);
  };

  setPreset = (preset: any) => {
    this.effectsPlugin?.setPreset(preset);
  };

  getPreset = () => {
    return this.effectsPlugin?.getPreset() || '';
  };

  removeEffects = async () => {
    this.effectsPlugin?.removeEffects();
  };

  reset = () => {
    this.effectsPlugin = undefined;
  };
}

export const VBHandler = new VBPlugin();
