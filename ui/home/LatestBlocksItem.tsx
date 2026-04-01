import { Box, Flex, Text } from "@chakra-ui/react";
import { capitalize } from "es-toolkit";
import React from "react";

import type { Block } from "types/api/block";

import config from "configs/app";
import getBlockTotalReward from "lib/block/getBlockTotalReward";
import getNetworkValidatorTitle from "lib/networks/getNetworkValidatorTitle";
import { currencyUnits } from "lib/units";
import { Skeleton } from "toolkit/chakra/skeleton";
import { Tooltip } from "toolkit/chakra/tooltip";
import { thinsp } from "toolkit/utils/htmlEntities";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import IconSvg from "ui/shared/IconSvg";
import TimeWithTooltip from "ui/shared/time/TimeWithTooltip";
import SimpleValue from "ui/shared/value/SimpleValue";
import BlockEntityHome from "ui/shared/entities/block/BlockEntityHome";
import getNetworkValidatorTitleWithName from "lib/networks/getNetworkValidatorTitleWithName";

type Props = {
  block: Block;
  isLoading?: boolean;
  animation?: string;
};

const LatestBlocksItem = ({ block, isLoading, animation }: Props) => {
  const totalReward = getBlockTotalReward(block);
  console.log("block", block);
  return (
    <Box
      animation={animation}
      py={3}
      borderBottom="1px solid"
      borderColor="border.divider"
    >
      <Flex align="center" justify="space-between" gap={4} w="100%">
        {/* Left */}

        <BlockEntityHome
          isLoading={isLoading}
          number={block.height}
          timestamp={block.timestamp}
          l1_era_finalized_epoch_number={
            block?.celo?.l1_era_finalized_epoch_number
          }
          tailLength={2}
          // textStyle="xl"
          fontWeight={600}
          lineHeight="1.1"
          fontSize="14px"
        />

        {/* Center */}
        <Box flex="1" minW={0} textAlign={{ base: "left", md: "center" }}>
          {!config.features.rollup.isEnabled &&
            !config.UI.views.block.hiddenFields?.miner && (
              <Box minW={0}>
                <Skeleton loading={isLoading} display="inline-block">
                  <Text
                    fontSize="14px"
                    fontWeight={500}
                    truncate
                    color={"#0E121B"}
                  >
                    {capitalize(
                      getNetworkValidatorTitleWithName(block.miner.name),
                    )}
                  </Text>
                </Skeleton>
                {/* <AddressEntity
                    address={block.miner}
                    isLoading={isLoading}
                    noIcon
                    noCopy
                    truncation="constant"
                  /> */}
              </Box>
            )}

          <Text color="text.secondary" fontSize="lg" lineHeight="1.2">
            <Skeleton loading={isLoading} display="inline-block">
              <Text
                as="span"
                color="#6962F1"
                fontWeight={400}
                fontSize={"14px"}
              >
                {block.transactions_count} txns
              </Text>
            </Skeleton>
            <Text as="span" fontSize={"14px"} color="#99A0AE">
              {" "}
              in 2s
            </Text>
          </Text>
        </Box>

        {/* Right */}
        {!config.features.rollup.isEnabled &&
          !config.UI.views.block.hiddenFields?.total_reward && (
            <Flex flexShrink={0} justify="flex-end">
              <Box
                px={6}
                py={3}
                borderRadius="8px"
                border="1px solid"
                borderColor="border.divider"
                bg="white"
                // minW="80px"
                textAlign="center"
                backgroundColor={"#F5F7FA"}
                padding={"8px 16px"}
              >
                <SimpleValue
                  value={totalReward}
                  loading={isLoading}
                  fontSize="14px"
                  fontWeight={500}
                  endElement={`${thinsp}${currencyUnits.ether}`}
                  color={"#0E121B"}
                />
              </Box>
            </Flex>
          )}
      </Flex>
    </Box>
  );
};

export default LatestBlocksItem;
