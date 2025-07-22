// seed.js
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './.env.local' });

const problems = [
    // Easy
    { 
      id: 'two-sum', 
      title: 'Two Sum', 
      difficulty: 'Easy', 
      topic: 'Arrays, Hashing', 
      status: 'Todo', 
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
        { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
        { input: { nums: [3, 3], target: 6 }, output: [0, 1] },
      ]
    },
    { 
      id: 'valid-parentheses', 
      title: 'Valid Parentheses', 
      difficulty: 'Easy', 
      topic: 'Stack, String', 
      status: 'Todo', 
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      testCases: [
        { input: { s: "()" }, output: true },
        { input: { s: "()[]{}" }, output: true },
        { input: { s: "(]" }, output: false },
        { input: { s: "([)]" }, output: false },
        { input: { s: "{[]}" }, output: true },
      ]
    },
    { 
      id: 'merge-two-sorted-lists', 
      title: 'Merge Two Sorted Lists', 
      difficulty: 'Easy', 
      topic: 'Linked List, Recursion', 
      status: 'Todo', 
      description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.',
      testCases: [
        { input: { list1: [1,2,4], list2: [1,3,4] }, output: [1,1,2,3,4,4] },
        { input: { list1: [], list2: [] }, output: [] },
        { input: { list1: [], list2: [0] }, output: [0] },
      ]
    },
    { 
      id: 'best-time-to-buy-and-sell-stock', 
      title: 'Best Time to Buy and Sell Stock', 
      difficulty: 'Easy', 
      topic: 'Arrays, Dynamic Programming', 
      status: 'Todo', 
      description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
      testCases: [
        { input: { prices: [7,1,5,3,6,4] }, output: 5 },
        { input: { prices: [7,6,4,3,1] }, output: 0 },
      ]
    },
    { 
      id: 'valid-palindrome', 
      title: 'Valid Palindrome', 
      difficulty: 'Easy', 
      topic: 'String, Two Pointers', 
      status: 'Todo', 
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
      testCases: [
        { input: { s: "A man, a plan, a canal: Panama" }, output: true },
        { input: { s: "race a car" }, output: false },
        { input: { s: " " }, output: true },
      ]
    },
    { 
      id: 'invert-binary-tree', 
      title: 'Invert Binary Tree', 
      difficulty: 'Easy', 
      topic: 'Tree, DFS, BFS', 
      status: 'Todo', 
      description: 'Given the root of a binary tree, invert the tree, and return its root.',
      testCases: [
        { input: { root: [4,2,7,1,3,6,9] }, output: [4,7,2,9,6,3,1] },
        { input: { root: [2,1,3] }, output: [2,3,1] },
      ]
    },
    { 
      id: 'valid-anagram', 
      title: 'Valid Anagram', 
      difficulty: 'Easy', 
      topic: 'String, Hashing', 
      status: 'Todo', 
      description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
      testCases: [
        { input: { s: "anagram", t: "nagaram" }, output: true },
        { input: { s: "rat", t: "car" }, output: false },
      ]
    },
    { 
      id: 'binary-search', 
      title: 'Binary Search', 
      difficulty: 'Easy', 
      topic: 'Arrays, Binary Search', 
      status: 'Todo', 
      description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
      testCases: [
        { input: { nums: [-1,0,3,5,9,12], target: 9 }, output: 4 },
        { input: { nums: [-1,0,3,5,9,12], target: 2 }, output: -1 },
      ]
    },
    { 
      id: 'flood-fill', 
      title: 'Flood Fill', 
      difficulty: 'Easy', 
      topic: 'Matrix, DFS, BFS', 
      status: 'Todo', 
      description: 'An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.',
      testCases: [
        { input: { image: [[1,1,1],[1,1,0],[1,0,1]], sr: 1, sc: 1, color: 2 }, output: [[2,2,2],[2,2,0],[2,0,1]] },
      ]
    },
    { 
      id: 'lowest-common-ancestor-of-a-bst', 
      title: 'Lowest Common Ancestor of a BST', 
      difficulty: 'Easy', 
      topic: 'Tree, BST', 
      status: 'Todo', 
      description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
      testCases: [
        { input: { root: [6,2,8,0,4,7,9,null,null,3,5], p: 2, q: 8 }, output: 6 },
      ]
    },
    // Medium
    { 
      id: '3sum', 
      title: '3Sum', 
      difficulty: 'Medium', 
      topic: 'Arrays, Two Pointers', 
      status: 'Todo', 
      description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
      testCases: [
        { input: { nums: [-1,0,1,2,-1,-4] }, output: [[-1,-1,2],[-1,0,1]] },
      ]
    },
    { 
      id: 'top-k-frequent-elements', 
      title: 'Top K Frequent Elements', 
      difficulty: 'Medium', 
      topic: 'Heap, Hashing', 
      status: 'Todo', 
      description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
      testCases: [
        { input: { nums: [1,1,1,2,2,3], k: 2 }, output: [1,2] },
      ]
    },
    { 
      id: 'product-of-array-except-self', 
      title: 'Product of Array Except Self', 
      difficulty: 'Medium', 
      topic: 'Arrays, Prefix Sum', 
      status: 'Todo', 
      description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
      testCases: [
        { input: { nums: [1,2,3,4] }, output: [24,12,8,6] },
      ]
    },
    { 
      id: 'kth-smallest-element-in-a-bst', 
      title: 'Kth Smallest Element in a BST', 
      difficulty: 'Medium', 
      topic: 'Tree, BST, Inorder Traversal', 
      status: 'Todo', 
      description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
      testCases: [
        { input: { root: [3,1,4,null,2], k: 1 }, output: 1 },
      ]
    },
    { 
      id: 'clone-graph', 
      title: 'Clone Graph', 
      difficulty: 'Medium', 
      topic: 'Graph, DFS, BFS, Hashing', 
      status: 'Todo', 
      description: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.',
      testCases: [
        { input: { adjList: [[2,4],[1,3],[2,4],[1,3]] }, output: [[2,4],[1,3],[2,4],[1,3]] },
      ]
    },
    { 
      id: 'container-with-most-water', 
      title: 'Container With Most Water', 
      difficulty: 'Medium', 
      topic: 'Arrays, Two Pointers', 
      status: 'Todo', 
      description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).',
      testCases: [
        { input: { height: [1,8,6,2,5,4,8,3,7] }, output: 49 },
      ]
    },
    { 
      id: 'coin-change', 
      title: 'Coin Change', 
      difficulty: 'Medium', 
      topic: 'Dynamic Programming', 
      status: 'Todo', 
      description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.',
      testCases: [
        { input: { coins: [1,2,5], amount: 11 }, output: 3 },
      ]
    },
    { 
      id: 'longest-substring-without-repeating-characters', 
      title: 'Longest Substring Without Repeating Characters', 
      difficulty: 'Medium', 
      topic: 'String, Sliding Window', 
      status: 'Todo', 
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      testCases: [
        { input: { s: "abcabcbb" }, output: 3 },
      ]
    },
    { 
      id: 'validate-binary-search-tree', 
      title: 'Validate Binary Search Tree', 
      difficulty: 'Medium', 
      topic: 'Tree, DFS', 
      status: 'Todo', 
      description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
      testCases: [
        { input: { root: [2,1,3] }, output: true },
        { input: { root: [5,1,4,null,null,3,6] }, output: false },
      ]
    },
    { 
      id: 'course-schedule', 
      title: 'Course Schedule', 
      difficulty: 'Medium', 
      topic: 'Graph, Topological Sort', 
      status: 'Todo', 
      description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.',
      testCases: [
        { input: { numCourses: 2, prerequisites: [[1,0]] }, output: true },
        { input: { numCourses: 2, prerequisites: [[1,0],[0,1]] }, output: false },
      ]
    },
    // --- START: Missing Problems Added Below ---
    { 
      id: 'number-of-islands', 
      title: 'Number of Islands', 
      difficulty: 'Medium', 
      topic: 'Matrix, DFS, BFS', 
      status: 'Todo', 
      description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
      testCases: [{ input: { grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] }, output: 3 }]
    },
    { 
      id: 'find-minimum-in-rotated-sorted-array', 
      title: 'Find Minimum in Rotated Sorted Array', 
      difficulty: 'Medium', 
      topic: 'Arrays, Binary Search', 
      status: 'Todo', 
      description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times.',
      testCases: [{ input: { nums: [3,4,5,1,2] }, output: 1 }]
    },
    { 
      id: 'median-of-two-sorted-arrays', 
      title: 'Median of Two Sorted Arrays', 
      difficulty: 'Hard', 
      topic: 'Binary Search, Arrays', 
      status: 'Todo', 
      description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      testCases: [{ input: { nums1: [1,3], nums2: [2] }, output: 2.0 }]
    },
    { 
      id: 'trapping-rain-water', 
      title: 'Trapping Rain Water', 
      difficulty: 'Hard', 
      topic: 'Arrays, Two Pointers, Stack', 
      status: 'Todo', 
      description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      testCases: [{ input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, output: 6 }]
    },
    { 
      id: 'word-ladder', 
      title: 'Word Ladder', 
      difficulty: 'Hard', 
      topic: 'BFS, Graphs', 
      status: 'Todo', 
      description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words.',
      testCases: [{ input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"] }, output: 5 }]
    },
    { 
      id: 'merge-k-sorted-lists', 
      title: 'Merge k Sorted Lists', 
      difficulty: 'Hard', 
      topic: 'Linked List, Heap', 
      status: 'Todo', 
      description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one.',
      testCases: [{ input: { lists: [[1,4,5],[1,3,4],[2,6]] }, output: [1,1,2,3,4,4,5,6] }]
    },
    { 
      id: 'largest-rectangle-in-histogram', 
      title: 'Largest Rectangle in Histogram', 
      difficulty: 'Hard', 
      topic: 'Stack, Arrays', 
      status: 'Todo', 
      description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle.',
      testCases: [{ input: { heights: [2,1,5,6,2,3] }, output: 10 }]
    },
    { 
        id: 'regular-expression-matching', 
        title: 'Regular Expression Matching', 
        difficulty: 'Hard', 
        topic: 'Dynamic Programming, Recursion', 
        status: 'Todo', 
        description: 'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\'.',
        testCases: [{ input: { s: "aa", p: "a*" }, output: true }]
    },
    { 
        id: 'sliding-window-maximum', 
        title: 'Sliding Window Maximum', 
        difficulty: 'Hard', 
        topic: 'Sliding Window, Deque', 
        status: 'Todo', 
        description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.',
        testCases: [{ input: { nums: [1,3,-1,-3,5,3,6,7], k: 3 }, output: [3,3,5,5,6,7] }]
    },
    { 
        id: 'n-queens', 
        title: 'N-Queens', 
        difficulty: 'Hard', 
        topic: 'Backtracking', 
        status: 'Todo', 
        description: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.',
        testCases: [{ input: { n: 4 }, output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]] }]
    },
    { 
        id: 'serialize-and-deserialize-binary-tree', 
        title: 'Serialize and Deserialize Binary Tree', 
        difficulty: 'Hard', 
        topic: 'Tree, DFS, Design', 
        status: 'Todo', 
        description: 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer.',
        testCases: [{ input: { root: [1,2,3,null,null,4,5] }, output: [1,2,3,null,null,4,5] }]
    },
    { 
        id: 'minimum-window-substring', 
        title: 'Minimum Window Substring', 
        difficulty: 'Hard', 
        topic: 'Sliding Window, Hashing', 
        status: 'Todo', 
        description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
        testCases: [{ input: { s: "ADOBECODEBANC", t: "ABC" }, output: "BANC" }]
    }
];

async function seedDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('CodeCracker').collection('problems');

    console.log('Deleting existing problems...');
    await collection.deleteMany({}); // Clear the collection

    console.log('Inserting new problems with test cases...');
    await collection.insertMany(problems);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedDB();
