import { ORDERS } from "@/assets/orders";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const OrderDetails = () => {
  const { slug } = useLocalSearchParams();
  const order = ORDERS.find((order) => order.slug === slug);
  if (!order) return <Redirect href={"/"} />;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${order.item}` }} />
      <Text style={styles.item}>{order.item}</Text>
      <Text style={styles.details}>{order.details}</Text>
      <View style={[styles.statusBadge, styles[`statusBaget_${order.status}`]]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
      <Text style={styles.date}>{order.date}</Text>
      <Text style={styles.itemTitle}>Items Ordered:</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={item.heroImage} style={styles.hereImage} />
            <View>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}> Price:{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default OrderDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    padding: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },

  statusBaget_Pending: {
    backgroundColor: "orange",
  },
  statusBaget_Completed: {
    backgroundColor: "green",
  },
  statusBaget_Shipped: {
    backgroundColor: "blue",
  },
  statusBaget_InTransit: {
    backgroundColor: "purple",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  hereImage: {
    width: "50%",
    height: 100,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
  },
});
