import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCartStore } from "../store/cart-store";
import { CartItemType } from "../types/model/CartItem";
type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};
const CartItem = ({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onDecrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityButtonText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onIncrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};
export default function Cart() {
  const { getTotalPrice, items, removeItem, increamentItem, decrementItem } =
    useCartStore();
  const handleCheckout = () => {
    Alert.alert(
      "Procecceding to Checkout",
      `Total amount: $${getTotalPrice()}`
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onDecrement={decrementItem}
            onIncrement={increamentItem}
          />
        )}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.footer}>
        <Text>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity
          onPress={handleCheckout}
          style={styles.checkOutButton}
        >
          <Text style={styles.checkOutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  cartList: {
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#ff5252",
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkOutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkOutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
