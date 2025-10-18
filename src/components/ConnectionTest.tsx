import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { api } from '../utils/api';

const ConnectionTest = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/test');
      setData(response);
    } catch (err: any) {
      console.error('Connection test failed:', err);
      setError(err.message || 'Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backend Connection Test</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Testing...' : 'Test Connection'}
          onPress={testConnection}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {error && (
        <View style={[styles.resultBox, styles.errorBox]}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      
      {data && (
        <View style={[styles.resultBox, styles.successBox]}>
          <Text style={styles.successText}>Success! 🎉</Text>
          <Text>Message: {data.message}</Text>
          <Text>Environment: {data.environment}</Text>
          <Text>Time: {new Date(data.timestamp).toLocaleString()}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  resultBox: {
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  successBox: {
    backgroundColor: '#e6f7e6',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  successText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});

export default ConnectionTest;
