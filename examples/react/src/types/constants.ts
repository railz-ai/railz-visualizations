import { RVOptions } from '@railzai/railz-visualizations';

export const INITIAL_OPTIONS: RVOptions = {
  container: {
    style: {
      border: 0,
      backgroundColor: '#000000',
      borderRadius: '20px',
      marginTop: '20px',
    },
  },
  title: {
    style: {
      color: '#ffffff',
      justifyContent: 'left',
      fontFamily: 'Inter',
      fontSize: '24px',
    },
  },
  subTitle: {
    style: {
      fontSize: '14px',
      textAlign: 'center',
      fontFamily: 'Inter',
      margin: 0,
      color: '#ffffff',
    },
    position: 'top',
    dateVisible: false,
  },
  chart: {
    colors: ['#ff0000', '#ff6900', '#d34000', '#ff4545', '#cccccc'],
    fontFamily: 'Inter',
    backgroundColor: 'rgba(0,0,0,0.91)',
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
    pie: {
      total: {
        color: '#ffffff',
        fontSize: '36px',
      },
      legendName: {
        color: '#ffffff',
        fontSize: '12px',
      },
      legendValue: {
        color: '#ffffff',
        fontSize: '12px',
      },
      positive: {
        color: '#259821',
        fontSize: '26px',
      },
      negative: {
        color: '#cc0000',
        fontSize: '26px',
      },
    },
    gauge: {
      score: {
        color: '#ffffff',
      },
      rating: {
        color: '#ffffff',
      },
      colorRanges: {
        default: 'red',
        525: '#a91a1a',
        575: '#af3333',
        625: '#98623d',
        675: '#ff6c6c',
        750: '#ff6c6c',
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
  ratio: {
    header: {
      flexDirection: 'column',
    },
    select: {
      position: 'center',
      container: {
        background: '#5b5a5a',
      },
      item: {
        color: 'white',
      },
      selectedItem: {
        color: 'black',
        background: 'white',
      },
      style: {
        background: 'white',
        color: 'black',
        padding: '10px',
        width: '30%',
        borderRadius: '10px',
        marginTop: '10px',
      },
    },
    itemContainer: {
      border: 0,
      borderRadius: '20px',
      boxShadow: '1px -1px 15px 5px #424242',
      color: '#ffffff',
      background: '#424242',
      marginTop: '20px',
      padding: '20px',
    },
    itemToolTip: {
      fillColor: 'white',
    },
    itemValue: {
      color: 'white',
    },
    itemNameText: {
      color: 'white',
    },
    itemPercentage: {
      positive: {
        color: '#92fa8f',
        fontSize: '26px',
      },
      negative: {
        color: '#ff6a6a',
        fontSize: '26px',
      },
    },
    sparkLine: {
      chart: {
        backgroundColor: '#000000',
        colors: ['#381da8'],
        label: {
          color: '#ffffff',
        },
        yAxisStyle: {
          gridLineColor: '#ffffff',
        },
        style: {
          borderRadius: '10px',
        },
      },
    },
  },
  table: {
    style: {
      padding: '30px',
    },
    title: {
      color: 'white',
      fontSize: '30px',
      marginBottom: '16px',
    },
    itemName: {
      fontSize: '16px',
      color: 'white',
    },
    itemSeperator: {
      display: 'none',
    },
    itemValue: {
      color: '#94b9ff',
      fontSize: '20px',
    },
  },
  loadingIndicator: {
    fillColor: '#ffffff',
    textStyle: {
      color: '#ffffff',
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
  tooltipIndicator: {
    fillColor: '#ffffff',
    width: '20px',
    height: '20px',
    tooltipTextStyle: {
      color: '#ffffff',
      backgroundColor: 'black',
    },
    visible: true,
  },
  content: {
    title: 'Account Balance',
    subTitle: 'The results below is determined by your business data',
    date: {
      format: 'MMMM yy',
      locale: 'fr',
      prefix: 'Quarter',
    },
    label: {
      grossBurnRate: 'Taxa de queima bruta',
    },
    tooltip: {
      description: 'Tooltip Customized',
      grossBurnRate: 'Tooltip => Taxa de queima bruta',
    },
  },
};
