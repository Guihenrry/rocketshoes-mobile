import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #fff;
  padding: 22px 15px 10px 15px;
  margin: 20px;
  border-radius: 4px;
`;

export const Product = styled.View`
  margin-bottom: 20px;
`;

// Product Header

export const ProductHeader = styled.View`
  flex-direction: row;
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  color: #333333;
  margin-bottom: 5px;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const ProductDeleteButton = styled.TouchableOpacity`
  padding: 6px;
`;

// Product Footer

export const ProductFooter = styled.View`
  padding: 7px 10px;
  background: #eeeeee;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ProductAmountButton = styled.TouchableOpacity``;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 5px 12px;
  margin: 0 5px;
  min-width: 51px;
`;

export const ProductSubtotal = styled.Text`
  flex: 1;
  text-align: right;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
`;

export const TotalText = styled.Text`
  font-size: 16px;
  color: #999999;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
`;

export const Total = styled.Text`
  font-size: 30px;
  color: #000000;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

export const SubmitButton = styled(RectButton)`
  background: #7159c1;
  padding: 12px;
  border-radius: 4px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
`;

// Empty Cart

export const EmptyContainer = styled.View`
  background: #fff;
  padding: 22px 15px 10px 15px;
  margin: 20px;
  border-radius: 4px;
  align-items: center;
`;

export const EmptyCartTitle = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const EmptyCartText = styled.Text`
  text-align: center;
  color: #999;
  margin-bottom: 10px;
`;

export const EmptyCartButton = styled(RectButton)`
  background: #7159c1;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const EmptyCartButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
`;
