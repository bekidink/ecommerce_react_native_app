import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { PRODUCTS } from "@/assets/products";
import { ProductListItem } from "@/src/components/product-item-list";
import { ListHeader } from "@/src/components/list-header";
import { getProductsAndCategories } from "@/src/api/api";

export default function TabOneScreen() {
  const { data, error, isLoading } = getProductsAndCategories();

  if (isLoading) return <ActivityIndicator />;

  if (error || !data)
    return <Text>Error {error?.message || "An error occured"}</Text>;
  return (
    <View>
      <FlatList
        data={data.products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
});
