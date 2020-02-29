import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px 0 20px 20px;
`;

export const Product = styled.View`
  background: #fff;
  border-radius: 4px;
  width: 220px;
  margin-right: 15px;
  padding: 10px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text`
  color: #333;
  font-size: 16px;
  margin: 10px 4px 0 10px;
`;

export const ProductPrice = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: #000;
  margin: 5px 10px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: #7159c1;
  margin-top: auto;
  border-radius: 4px;
`;

export const AddButtonLoading = styled.View`
  padding: 14px 20px;
  background: rgba(0, 0, 0, 0.2);

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const AddButtonText = styled.Text`
  flex: 1;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;

export const AddButtonAmount = styled.Text`
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const AddButtonAmountText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
