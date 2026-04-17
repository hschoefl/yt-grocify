import CompletedItems from "@/components/list/CompletedItems";
import ListHeroCard from "@/components/list/ListHeroCard";
import PendingItemCard from "@/components/list/PendingItemCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import React from "react";
import { ScrollView, Text, View } from "react-native";

// only users that are authenticated can see this screen

const ListScreen = () => {
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <ScrollView
      className="flex-1 bg-background py-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, gap: 14 }}
    >
      <TabScreenBackground />
      <ListHeroCard />

      <View className="flex-row items-center justify-between px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          Shopping items
        </Text>
        <Text className="text-sm text-muted-foreground">
          {pendingItems.length} active
        </Text>
      </View>

      {pendingItems.map((item) => (
        <PendingItemCard key={item.id} item={item} />
      ))}

      <CompletedItems />
    </ScrollView>
  );
};

export default ListScreen;
