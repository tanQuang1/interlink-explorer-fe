import { Flex, Text, chakra } from '@chakra-ui/react';
import React from 'react';

import type { Route } from 'nextjs-routes';
import { route } from 'nextjs-routes';

import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';

const TxsStatsCardContainer = ({ href, children }: { href?: Route; children: React.JSX.Element }) => {
  if (href) {
    return (
      <Link href={ route(href) } variant="plain">
        { children }
      </Link>
    );
  }

  return children;
};

interface TxsStatsCardProps {
  href?: Route;
  isLoading: boolean;
  label: string;
  note?: string;
  noteTone?: 'positive' | 'negative' | 'default';
  value: string;
  valuePrefix?: React.ReactNode;
  valuePostfix?: React.ReactNode;
}

const TxsStatsCardCustom = ({
  href,
  isLoading,
  label,
  note,
  noteTone = 'default',
  value,
  valuePrefix,
  valuePostfix,
}: TxsStatsCardProps) => {
  const noteColor = (() => {
    if (noteTone === 'positive') {
      return 'text.success';
    }

    if (noteTone === 'negative') {
      return 'text.error';
    }

    return 'text.secondary';
  })();

  return (
    <TxsStatsCardContainer href={ !isLoading ? href : undefined }>
      <Flex
        direction="column"
        justifyContent="center"
        minH={{ base: '92px', lg: '96px' }}
        px={{ base: 4, lg: 6 }}
        py={ 4 }
        borderRadius="24px"
        bgColor="#F5F7FA"
        w="100%"
        h="100%"
      >
        <Skeleton loading={ isLoading } color="text.secondary" textStyle="sm" w="fit-content">
          <Text as="h2" fontWeight={ 500 }>
            { label }
          </Text>
        </Skeleton>
        <Skeleton
          loading={ isLoading }
          mt={ 2 }
          display="flex"
          alignItems="baseline"
          flexWrap="wrap"
          gapX={ 1 }
          gapY={ 1 }
        >
          <Text as="span" textStyle={{ base: 'heading.sm', lg: 'heading.md' }} fontWeight={ 600 } color="text.primary">
            { valuePrefix }{ value }{ valuePostfix }
          </Text>
          { note && (
            <Text as="span" textStyle="sm" color={ noteColor } fontWeight={ 500 }>
              { note }
            </Text>
          ) }
        </Skeleton>
      </Flex>
    </TxsStatsCardContainer>
  );
};
export default chakra(TxsStatsCardCustom);
