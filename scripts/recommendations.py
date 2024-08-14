import sys
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Sample product data
data = {
    'product_id': [1, 2, 3, 4],
    'product_name': ['Product A', 'Product B', 'Product C', 'Product D'],
    'category': ['Electronics', 'Electronics', 'Clothing', 'Clothing'],
    'tags': ['smartphone, android', 'tablet, ios', 'shirt, cotton', 'jeans, denim']
}

df = pd.DataFrame(data)

def get_recommendations(search_query, df):
    # Filter the DataFrame based on the search query
    filtered_df = df[df['product_name'].str.contains(search_query, case=False, na=False)]

    # Convert tags and category into feature vectors
    filtered_df['combined_features'] = filtered_df['category'] + ", " + filtered_df['tags']

    # Create the count matrix
    count_matrix = filtered_df['combined_features'].str.get_dummies(sep=', ')

    # Compute cosine similarity matrix
    cosine_sim = cosine_similarity(count_matrix, count_matrix)

    # Function to get recommendations
    if not filtered_df.empty:
        idx = 0  # Assume we're only interested in the first match
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:4]  # Exclude the first one (itself)
        product_indices = [i[0] for i in sim_scores]
        return filtered_df['product_id'].iloc[product_indices].tolist()
    else:
        return []

if __name__ == "__main__":
    search_query = sys.argv[1]
    recommendations = get_recommendations(search_query, df)
    print(recommendations)

