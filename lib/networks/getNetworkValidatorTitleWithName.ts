import config from 'configs/app';

export default function getNetworkValidatorTitleWithName(name?: string | null) {
  const normalizedName = name?.trim();

  const title = (() => {
    switch (config.chain.verificationType) {
      case 'validation':
        return 'validator';
      case 'mining':
        return 'miner';
      case 'posting':
        return 'poster';
      case 'sequencing':
        return 'sequencer';
      case 'fee reception':
        return 'fee recipient';
      default:
        return 'miner';
    }
  })();

  return normalizedName ? `${title} ${normalizedName}` : title;
}