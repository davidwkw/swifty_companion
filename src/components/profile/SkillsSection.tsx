import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  processColor,
} from 'react-native';
import React, {PropsWithChildren, useState, useEffect} from 'react';
import {Skill} from '../../types/user';
import {
  ChartDescription,
  ChartLegend,
  RadarChart,
  RadarData,
  xAxis,
  yAxis,
} from 'react-native-charts-wrapper';

import * as COLORS from '../../styles/Colors';

type SkillsSectionProps = PropsWithChildren<{
  skills: Skill[];
  containerStyle?: StyleProp<ViewStyle>;
}>;

type ModifiedXAxis = xAxis & {
  valueFormatter?: string[] | undefined;
};

type RadarDataWithXAxis = {
  radarData: RadarData;
  xAxis: ModifiedXAxis;
};

const legendConfig: ChartLegend = {
  enabled: false,
};

const yAxisConfig: yAxis = {
  drawLabels: false,
};

const chartDescriptionConfig: ChartDescription = {
  text: '',
};

export default function SkillsSection({
  skills,
  containerStyle,
}: SkillsSectionProps): JSX.Element {
  const [data, setData] = useState<RadarData>({});
  const [xAxisConfig, setXAxisConfig] = useState<xAxis>({});

  useEffect((): void => {
    const tempData = skills.reduce(
      (acc, skill): RadarDataWithXAxis => {
        acc.radarData.dataSets![0].values!.push(skill.level);
        acc.xAxis.valueFormatter!.push(skill.name);
        return acc;
      },
      {
        radarData: {
          dataSets: [{values: [], label: ''}],
        },
        xAxis: {valueFormatter: []},
      } as RadarDataWithXAxis,
    );

    tempData.radarData.dataSets![0].config = {
      color: processColor(COLORS.FT_PRIMARY),
      drawFilled: true,
      fillColor: processColor(COLORS.FT_PRIMARY),
      fillAlpha: 100,
      lineWidth: 2,
      valueTextSize: 12,
      valueTextColor: processColor(COLORS.FT_SECONDARY),
    };

    console.log(tempData.radarData.dataSets![0].values);
    console.log(
      Math.ceil(
        Math.max(...(tempData.radarData.dataSets![0].values as number[])) / 10,
      ) * 10,
    );
    console.log(
      Math.min(...(tempData.radarData.dataSets![0].values as number[])),
    );

    tempData.xAxis = {
      ...tempData.xAxis,
      textSize: 14,
      textColor: processColor('white'),
      // axisMaximum:
      //   Math.ceil(
      //     Math.max(...(tempData.radarData.dataSets![0].values as number[])) /
      //       10,
      //   ) * 10,
      // axisMinimum: Math.min(
      //   ...(tempData.radarData.dataSets![0].values as number[]),
      // ),
      axisMaximum: 10,
      axisMinimum: 0,
    };

    setData(tempData.radarData);
    setXAxisConfig(tempData.xAxis);
  }, [skills]);

  return (
    <View style={[styles.componentContainer, containerStyle]}>
      <View style={styles.headerView}>
        <Text style={styles.skillText}>Skills:</Text>
      </View>
      <View style={styles.chartContainer}>
        <RadarChart
          style={styles.chart}
          data={data}
          legend={legendConfig}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
          chartDescription={chartDescriptionConfig}
          drawWeb={true}
          webLineWidth={2}
          webLineWidthInner={2}
          webAlpha={123}
          webColor={processColor('grey')}
          webColorInner={processColor(COLORS.FT_SECONDARY)}
          // onSelect={this.handleSelect.bind(this)}
          // onChange={event => console.log(event.nativeEvent)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },
  chart: {
    flex: 1,
  },
  componentContainer: {
    width: '100%',
    height: '100%',
  },
  skillText: {
    fontSize: 18,
    color: '#fff',
  },
  headerView: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
