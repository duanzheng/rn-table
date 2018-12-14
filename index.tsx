import React from 'react';
import {FlatList, View, Text, StyleProp, ViewStyle} from 'react-native';

type ColumnItem = {
  key: string;
  title?: string;
  dataIndex: string;
  width: number;
  align?: 'left' | 'right';
  render?: (text?: string, record?: object, index?: number) => React.ReactNode;
  renderAbsolute?: (
    text?: string,
    record?: object,
    index?: number
  ) => React.ReactNode;
};
type Props = {
  columns: ColumnItem[];
  dataSource: object[];
  showHeader?: boolean;
  style?: StyleProp<ViewStyle>;
  borderSpacing?: number;
};

export default class Index extends React.PureComponent<Props> {
  static defaultProps = {
    showHeader: true,
  };

  renderItem = ({ item }: any) => {
    const { columns, borderSpacing } = this.props;

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: 20,
          },
          borderSpacing ? { marginVertical: borderSpacing / 2 } : {},
        ]}
      >
        {columns.map(
          ({ dataIndex, align, width, render, renderAbsolute }, index) => {
            const text = item[dataIndex];
            if (renderAbsolute && typeof renderAbsolute === 'function') {
              return renderAbsolute(text, item, index);
            }
            const RenderItem = render && render(text, item, index);
            return RenderItem ? (
              <View
                key={dataIndex}
                style={{
                  flexGrow: 1,
                  flexBasis: width,
                }}
              >
                {RenderItem}
              </View>
            ) : (
              <View style={{
                flexGrow: 1,
                flexBasis: width,
              }}>
                <Text
                  key={dataIndex}
                  style={{
                    fontSize: 12,
                    textAlign: align || 'auto',
                    color: '#fff',
                  }}
                >
                  {text}
                </Text>
              </View>
            );
          }
        )}
      </View>
    );
  };

  render() {
    const { columns, dataSource, showHeader, style } = this.props;
    return (
      <View style={style}>
        {showHeader && (
          <View style={{ flexDirection: 'row' }}>
            {columns.map(
              i =>
                i.title && (
                  <Text
                    key={i.key}
                    style={{
                      flexGrow: 1,
                      flexBasis: i.width,
                      textAlign: i.align || 'left',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.5)',
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    {i.title}
                  </Text>
                )
            )}
          </View>
        )}
        <FlatList
          data={dataSource}
          alwaysBounceVertical={false}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
