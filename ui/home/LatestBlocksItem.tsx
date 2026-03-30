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

type Props = {
  block: Block;
  isLoading?: boolean;
  animation?: string;
};

const LatestBlocksItem = ({ block, isLoading, animation }: Props) => {
  const totalReward = getBlockTotalReward(block);

  return (
    <Box
      animation={animation}
      py={4}
      borderBottom="1px solid"
      borderColor="border.divider"
    >
      <Flex align="center" justify="space-between" gap={4} w="100%">
        {/* Left */}
        <Flex align="center" minW={0} flex="1">
          {/* <Flex
            boxSize="56px"
            borderRadius="full"
            bg="gray.50"
            align="center"
            justify="center"
            flexShrink={0}
            mr={4}
          >
            <IconSvg name="globe" boxSize={7} color="text.secondary" />
          </Flex> */}

          <Box minW={0}>
            <BlockEntity
              isLoading={isLoading}
              number={block.height}
              tailLength={2}
              // textStyle="xl"
              fontWeight={600}
              lineHeight="1.1"
              fontSize="14px"
            />

            <Flex align="center" mt={1} color="text.secondary" minW={0} >
              {block.celo?.l1_era_finalized_epoch_number && (
                <Tooltip
                  content={`Finalized epoch #${block.celo.l1_era_finalized_epoch_number}`}
                >
                  <Box mr={2} flexShrink={0}>
                    <IconSvg
                      name="checkered_flag"
                      boxSize={4}
                      p="1px"
                      isLoading={isLoading}
                      fontSize="14px"
                    />
                  </Box>
                </Tooltip>
              )}

              <TimeWithTooltip
                timestamp={block.timestamp}
                enableIncrement={!isLoading}
                timeFormat="relative"
                isLoading={isLoading}
                color="text.secondary"
                textStyle="lg"
                display="inline-block"
                fontSize="14px"
              />
            </Flex>
          </Box>
        </Flex>

        {/* Center */}
        <Box flex="1" minW={0} textAlign={{ base: "left", md: "center" }}>
          {!config.features.rollup.isEnabled &&
            !config.UI.views.block.hiddenFields?.miner && (
              <Box minW={0}>
                <Text
                  fontSize="14px"
                  fontWeight={600}
                  lineHeight="1.1"
                  mb={1}
                  truncate
                >
                  <Skeleton loading={isLoading} display="inline-block">
                    {capitalize(getNetworkValidatorTitle())}{" "}
                  </Skeleton>
                  <AddressEntity
                    address={block.miner}
                    isLoading={isLoading}
                    noIcon
                    noCopy
                    truncation="constant"
                  />
                </Text>
              </Box>
            )}

          <Text color="text.secondary" fontSize="lg" lineHeight="1.2">
            <Skeleton loading={isLoading} display="inline-block">
              <Text as="span" color="link.hover" fontWeight={600}>
                {block.transactions_count} txns
              </Text>
            </Skeleton>
            <Text as="span"> in </Text>
            <TimeWithTooltip
              timestamp={block.timestamp}
              enableIncrement={!isLoading}
              timeFormat="relative"
              isLoading={isLoading}
              color="text.secondary"
              display="inline-block"
              textStyle="lg"
            />
          </Text>
        </Box>

        {/* Right */}
        {!config.features.rollup.isEnabled &&
          !config.UI.views.block.hiddenFields?.total_reward && (
            <Flex flexShrink={0} justify="flex-end">
              <Box
                px={6}
                py={3}
                borderRadius="16px"
                border="1px solid"
                borderColor="border.divider"
                bg="white"
                minW="146px"
                textAlign="center"
              >
                <SimpleValue
                  value={totalReward}
                  loading={isLoading}
                  fontSize="2xl"
                  fontWeight={500}
                  endElement={`${thinsp}${currencyUnits.ether}`}
                />
              </Box>
            </Flex>
          )}
      </Flex>
    </Box>
  );
};

export default LatestBlocksItem;