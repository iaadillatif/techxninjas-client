import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';

interface TableCheck {
  name: string;
  exists: boolean;
  count?: number;
  error?: string;
}

/**
 * Database Connection Test Page
 * Navigate to /db-test to check database setup
 */
const DatabaseTestPage: React.FC = () => {
  const [checking, setChecking] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [tables, setTables] = useState<TableCheck[]>([]);

  useEffect(() => {
    checkDatabaseSetup();
  }, []);

  const checkDatabaseSetup = async () => {
    setChecking(true);
    const tableChecks: TableCheck[] = [];

    // List of tables to check
    const tablesToCheck = [
      'newsletter_subscribers',
      'badges',
      'user_badges',
      'user_gamification',
      'notifications',
      'bookmarks',
      'collections',
      'user_follows',
      'messages',
      'activity_feed',
    ];

    // Check each table
    for (const tableName of tablesToCheck) {
      try {
        const { data, error, count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          tableChecks.push({
            name: tableName,
            exists: false,
            error: error.message,
          });
        } else {
          tableChecks.push({
            name: tableName,
            exists: true,
            count: count || 0,
          });
        }
      } catch (err: any) {
        tableChecks.push({
          name: tableName,
          exists: false,
          error: err.message,
        });
      }
    }

    setTables(tableChecks);

    // Determine overall status
    const allExist = tableChecks.every((t) => t.exists);
    setConnectionStatus(allExist ? 'success' : 'error');
    setChecking(false);
  };

  const getStatusIcon = (exists: boolean) => {
    if (exists) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const allTablesExist = tables.every((t) => t.exists);
  const someTablesExist = tables.some((t) => t.exists);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔧 Database Connection Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Checking if all database tables are set up correctly
          </p>
        </div>

        {/* Overall Status */}
        <div className={`mb-8 p-6 rounded-lg border-2 ${
          checking
            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
            : connectionStatus === 'success'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
            : 'bg-red-50 dark:bg-red-900/20 border-red-500'
        }`}>
          <div className="flex items-center gap-4">
            {checking ? (
              <>
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Checking Database...
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please wait while we verify your database setup
                  </p>
                </div>
              </>
            ) : connectionStatus === 'success' ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
                    ✅ Database Setup Complete!
                  </h2>
                  <p className="text-green-600 dark:text-green-400">
                    All tables are created and accessible. You're ready to go! 🎉
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-red-500" />
                <div>
                  <h2 className="text-xl font-bold text-red-700 dark:text-red-300">
                    ❌ Database Setup Incomplete
                  </h2>
                  <p className="text-red-600 dark:text-red-400">
                    {someTablesExist
                      ? 'Some tables are missing. Please run the complete SQL schema.'
                      : 'Database tables not found. Please run the SQL schema in Supabase.'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Setup Instructions (if not complete) */}
        {!checking && !allTablesExist && (
          <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  Setup Required
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                  <li>Open your Supabase Dashboard</li>
                  <li>Go to SQL Editor</li>
                  <li>Copy all content from <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">supabase-schema.sql</code></li>
                  <li>Paste and run in SQL Editor</li>
                  <li>Refresh this page to verify</li>
                </ol>
                <div className="mt-4">
                  <a
                    href="https://app.supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Open Supabase Dashboard →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table Status */}
        {!checking && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-brand-primary to-brand-light-blue p-4">
              <h2 className="text-xl font-bold text-white">Database Tables Status</h2>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {tables.map((table) => (
                <div key={table.name} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(table.exists)}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {table.name}
                        </h3>
                        {table.error && (
                          <p className="text-xs text-red-500 mt-1">{table.error}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {table.exists ? (
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {table.count} row{table.count !== 1 ? 's' : ''}
                          </span>
                          <div className="text-xs text-green-600 dark:text-green-400">
                            ✓ Ready
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-red-600 dark:text-red-400">
                          Not found
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connection Info */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">
            Connection Info
          </h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex gap-2">
              <span className="text-gray-600 dark:text-gray-400">URL:</span>
              <span className="text-gray-900 dark:text-white truncate">
                Connected to Supabase
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className={`font-semibold ${
                connectionStatus === 'success'
                  ? 'text-green-600 dark:text-green-400'
                  : connectionStatus === 'error'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                {checking ? 'Checking...' : connectionStatus === 'success' ? 'Connected' : 'Setup Required'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={checkDatabaseSetup}
            disabled={checking}
            className="bg-brand-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checking ? 'Checking...' : 'Recheck Database'}
          </button>

          {allTablesExist && (
            <a
              href="/demo"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-block"
            >
              View Demo Page →
            </a>
          )}
        </div>

        {/* Documentation Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Need help setting up?
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/DATABASE_SETUP.md"
              target="_blank"
              className="text-brand-primary hover:underline text-sm"
            >
              View Setup Guide
            </a>
            <a
              href="/FEATURES_GUIDE.md"
              target="_blank"
              className="text-brand-primary hover:underline text-sm"
            >
              View Features Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTestPage;
