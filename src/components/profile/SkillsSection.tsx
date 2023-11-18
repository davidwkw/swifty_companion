import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  processColor,
} from 'react-native';
import React, {PropsWithChildren, useState, useCallback} from 'react';
import {Skill} from '../../types/user';
import {BarChart} from 'react-native-chart-kit';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {LayoutChangeEvent} from 'react-native';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';

import {RadarChart} from 'react-native-charts-wrapper';

import * as COLORS from '../../constants/Colors';

type SkillsSectionProps = PropsWithChildren<{
  skills: Skill[];
  containerStyle?: StyleProp<ViewStyle>;
}>;

const chartConfig: AbstractChartConfig = {
  color(opacity): string {
    console.log('opacity' + opacity);
    return 'green';
  },
  backgroundColor: '#fff',
};

const widthPercentage = 1;
const heightPercentage = 1;

export default function SkillsSection({
  skills,
  containerStyle,
}: SkillsSectionProps): JSX.Element {
  const data: ChartData = skills.reduce(
    (acc, skill): ChartData => {
      acc.labels.push(skill.name);
      acc.datasets[0].data.push(skill.level);
      return acc;
    },
    {
      labels: [],
      datasets: [{data: []}],
    } as ChartData,
  );
  const [parentViewDimensions, setParentViewDimensions] = useState<{
    width: number;
    height: number;
  }>({width: 0, height: 0});

  const onComponentLayout = useCallback((event: LayoutChangeEvent): void => {
    const {width, height} = event.nativeEvent.layout;
    setParentViewDimensions({width, height});
  }, []);

  return (
    <View
      onLayout={onComponentLayout}
      style={[styles.componentContainer, containerStyle]}>
      <View style={styles.headerView}>
        <Text style={styles.skillText}>Skills:</Text>
      </View>
      <BarChart
        style={styles.graphStyle}
        data={data}
        width={parentViewDimensions.width * widthPercentage}
        height={parentViewDimensions.height * heightPercentage}
        yAxisLabel="Level"
        yAxisSuffix=""
        chartConfig={chartConfig}
        fromZero={true}
        horizontalLabelRotation={10}
        showBarTops={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  graphStyle: {},
  componentContainer: {
    width: '100%',
    height: '100%',
  },
  skillText: {
    fontSize: 16,
    color: '#fff',
  },
  headerView: {
    marginBottom: 5,
  },
});
