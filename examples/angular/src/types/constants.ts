import { RVOptions } from '@railzai/railz-visualizations';

export const INITIAL_OPTIONS: RVOptions = {
  container: {
    style: {
      border: 0,
      backgroundColor: 'black',
      borderRadius: '0',
    },
    tooltip: true,
    date: true,
  },
  title: {
    style: {
      color: '#cccccc',
      fontSize: '24px',
    },
  },
  chart: {
    colors: ['#ff0000', '#ff6900', '#d34000', '#ff4545', '#cccccc'],
    fontFamily: 'Inter',
    backgroundColor: 'black',
    label: {
      fontFamily: 'Inter',
      fontSize: '18px',
      color: '#ffffff',
    },
    legend: {
      itemStyle: {
        fontFamily: 'Inter',
        fontSize: '16px',
        color: '#cccccc',
      },
    },
  },
  bar: {
    titleStyle: {
      color: '#ffffff',
    },
    titleValueStyle: {
      color: '#ffffff',
    },
    subTitle1Style: {
      color: '#ffffff',
    },
    subTitleValue1Style: {
      color: '#ffffff',
    },
    subTitle2Style: {
      color: '#ffffff',
    },
    subTitleValue2Style: {
      color: '#ffffff',
    },
    barStyle: {
      background: '#cdf8c4',
      borderRadius: '5px',
    },
    progressStyle: {
      background: '#2e6521',
      borderRadius: '5px',
    },
  },
  loadingIndicator: {
    fillColor: '#4DAE37',
    textStyle: {
      color: '#4DAE37',
      fontWeight: 'bold',
    },
  },
  errorIndicator: {
    fillColor: '#FF7575',
    textStyle: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  },
  content: {
    title: 'title',
    date: {
      quarter: 'QUARTER_',
      month: {
        format: 'MMMM yy',
        locale: 'ptBR',
      },
    },
    label: {
      date: 'As of today release:',
      grossBurnRate: 'Taxa de queima bruta',
    },
    tooltip: {
      description: 'Tooltip Customized',
      grossBurnRate: 'Tooltip => Taxa de queima bruta',
    },
  },
};
