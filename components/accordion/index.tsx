/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import { View, Text } from 'react-native';
import RNAccordion from 'react-native-collapsible/Accordion';
import AccordionProps from './PropsType';
import AccordionStyle from './style/index';
import Icon from '../icon';

class Accordion extends React.Component<AccordionProps, any> {
  static defaultProps = {
    styles: AccordionStyle,
  };

  static Panel: any;

  _renderHeader = (section, _, isActive) => {
    const styles = this.props.styles;
    return (
      <View style={styles.header}>
        {
          React.isValidElement(section.title) ? section.title : (
            <View style={styles.headerWrap}>
              <Text style={styles.headerText}>{section.title}</Text>
            </View>
          )
        }
        <View style={styles.arrow}>
          <Icon type={isActive ? 'up' : 'down'} size={15} color="#000" />
        </View>
      </View>
    );
  }

  _renderContent = (section) => {
    const styles = this.props.styles;
    return React.isValidElement(section.content) ? section.content : (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  }

  onChange = (idx) => {
    const { onChange, children } = this.props;
    let key;
    React.Children.map(children, (child: any, index) => {
      if (idx === index) {
        key = child.props.key;
      }
    });
    if (onChange) {
      onChange(key);
    }
  }

  render() {
    const { children, styles, defaultActiveKey, activeKey } = this.props;
    let defaultActiveSection;
    let activeSection;
    const headers = React.Children.map(children, (child: any, index) => {
      if (child.props.key && child.props.key === defaultActiveKey) {
        defaultActiveSection = index;
      }
      if (child.props.key && child.props.key === activeKey) {
        activeSection = index;
      }
      return {
        title: child.props.header,
        content: child.props.children,
      };
    });

    return (
      <View style={styles.container}>
        <RNAccordion
          initiallyActiveSection={defaultActiveKey}
          activeSection={activeKey}
          underlayColor="transparent"
          sections={headers}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={0}
          onChange={this.onChange}
        />
      </View>
    );
  }
}

Accordion.Panel = () => null;

export default Accordion;
