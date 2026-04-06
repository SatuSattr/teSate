import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ArticleCard({
  title,
  excerpt,
  image,
  author,
  date,
  onPress,
}: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {excerpt && (
          <Text style={styles.excerpt} numberOfLines={3}>
            {excerpt}
          </Text>
        )}

        <View style={styles.footer}>
          {author && <Text style={styles.meta}>{author}</Text>}
          {date && <Text style={styles.meta}>{date}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  excerpt: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    fontSize: 12,
    color: "#888",
  },
});
