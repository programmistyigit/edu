import { CandlestickChart } from 'react-native-wagmi-charts';
import { Dimensions, StyleSheet, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';

export default function Example() {
  const [randomData] = useState([
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 25,
      high: 29,
      low: 12,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 25,
      high: 21,
      low: 40,
      close: 36
    },
    {
      timestamp: Date.now(),
      open: 36,
      high: 32,
      low: 56,
      close: 52
    }
    ,
    {
      timestamp: Date.now(),
      open: 52,
      high: 48,
      low: 76,
      close: 72
    },
    {
      timestamp: Date.now(),
      open: 72,
      high: 76,
      low: 21,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 84,
      low: 14,
      close: 80
    },{
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 25,
      high: 29,
      low: 12,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 25,
      high: 21,
      low: 40,
      close: 36
    },
    {
      timestamp: Date.now(),
      open: 36,
      high: 32,
      low: 56,
      close: 52
    }
    ,
    {
      timestamp: Date.now(),
      open: 52,
      high: 48,
      low: 76,
      close: 72
    },
    {
      timestamp: Date.now(),
      open: 72,
      high: 76,
      low: 21,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 18,
      high: 14,
      low: 29,
      close: 25
    },
    {
      timestamp: Date.now(),
      open: 10,
      high: 6,
      low: 20,
      close: 16
    },
    {
      timestamp: Date.now(),
      open: 16,
      high: 20,
      low: 8,
      close: 12
    }
    ,
    {
      timestamp: Date.now(),
      open: 12,
      high: 22,
      low: 8,
      close: 18
    }
  ]);

  // for (let i = 0; i < 30; i++) {
  //   const randomDatum = getRandomData();
  //   randomData.push(randomDatum);
  // }
  const component = useMemo(() =>{
    return (
      <View style={{ overflow: "hidden", borderRadius: 15 }}>

      <LinearGradient
        colors={['#1c1c1c', '#303030']}
        start={[0, 0]}
        end={[1, 1]}
        locations={[0.2, 0.7]}
        style={{paddingHorizontal:5}}
      >
        <CandlestickChart.Provider data={randomData.splice(0 , 30)} >
          <CandlestickChart width={Dimensions.get("window").width - 40} height={300}>
            <CandlestickChart.Candles />
          </CandlestickChart>
        </CandlestickChart.Provider>
      </LinearGradient>
    </View>
    )
  } , [randomData])

  return component
}
