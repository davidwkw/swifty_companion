import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import React, {PropsWithChildren, useState, useMemo, useCallback} from 'react';
import {Skill} from '../../types/user';
import {
  VictoryChart,
  VictoryArea,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';
import {VictoryStyleInterface} from 'victory-core';

import * as COLORS from '../../styles/Colors';

type SkillsSectionProps = PropsWithChildren<{
  skills: Skill[];
  containerStyle?: StyleProp<ViewStyle>;
  chartContainerStyle?: StyleProp<ViewStyle>;
}>;

type VictoryDataPropType = {
  x: string;
  y: number;
  label?: string;
  symbol?: string;
  fill?: string;
  opacity?: number;
};

const getMaximum = (data: Skill[]): number => {
  const levelArray = data.map((d: Skill): number => d.level);
  return Math.max(...levelArray);
};

const processData = (skillData: Skill[]): VictoryDataPropType[] => {
  return skillData.map((d: Skill): VictoryDataPropType => {
    const nameWithNewline = d.name.replace(' ', '\n');
    return {x: nameWithNewline, y: d.level};
  });
};

const chartMultiplier = 1;

export default function SkillsSection({
  skills,
  containerStyle,
  chartContainerStyle,
}: SkillsSectionProps): JSX.Element {
  const [chartContainerDimensions, setChartContainerDimensions] = useState<{
    width: number;
    height: number;
  }>({width: 0, height: 0});
  const skillData = useMemo(
    (): VictoryDataPropType[] => processData(skills),
    [skills],
  );
  const maximum = useMemo((): number => getMaximum(skills), [skills]);
  const onChartLayoutCallback = useCallback(
    ({nativeEvent}: LayoutChangeEvent): void => {
      const minimumDimension = Math.min(
        nativeEvent.layout.width,
        nativeEvent.layout.height,
      );
      setChartContainerDimensions({
        width: minimumDimension,
        height: minimumDimension,
      });
    },
    [],
  );

  return (
    <View style={[styles.componentContainer, containerStyle]}>
      <View style={styles.headerView}>
        <Text style={styles.skillText}>Skills</Text>
      </View>
      {skillData.length === 0 ? (
        <View style={[styles.chartContainer]}>
          <Text style={styles.skillText}>No skills to display</Text>
        </View>
      ) : (
        <View
          style={[styles.chartContainer, chartContainerStyle]}
          onLayout={onChartLayoutCallback}>
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            height={chartContainerDimensions.height * chartMultiplier}
            width={chartContainerDimensions.width * chartMultiplier}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({datum}): string => `Level: ${datum.y.toFixed(2)}`}
                labelComponent={
                  <VictoryTooltip
                    dy={0}
                    pointerLength={30}
                    constrainToVisibleArea
                    flyoutStyle={{fill: '#fff'}}
                  />
                }
              />
            }>
            {skillData.map((d, i): JSX.Element => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  style={{
                    axisLabel: {
                      padding: 20,
                      fill: 'black',
                      wordWrap: 'break-word',
                    },
                    axis: {stroke: 'none'},
                    grid: {stroke: 'grey', strokeWidth: 0.25, opacity: 0.5},
                  }}
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical" />
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1}
                  label={d.x}
                  domain={{y: [0, Math.ceil(maximum)]}}
                  tickFormat={
                    d.y === maximum ? t => Math.floor(t) : (): string => ''
                  }
                />
              );
            })}
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={(): string => ''}
              style={{
                axis: {stroke: COLORS.FT_PRIMARY},
                grid: {stroke: 'grey', opacity: 0.5},
              }}
            />
            <VictoryArea data={skillData} style={victoryAreaStyle} />
          </VictoryChart>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    flex: 1,
  },
  componentContainer: {},
  skillText: {
    fontSize: 18,
    color: COLORS.FT_SECONDARY,
    borderRadius: 20,
    padding: 5,
  },
  headerView: {
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const victoryAreaStyle: VictoryStyleInterface = {
  data: {
    fillOpacity: 0.2,
    fill: COLORS.FT_PRIMARY,
  },
};
