// Updated PptViewer.jsx
'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import WebViewer with SSR disabled
const WebViewerComponent = dynamic(
  () => import('@pdftron/webviewer').then(mod => mod.default),
  { ssr: false }
);

export default function PptViewer({ fileName }) {
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const viewerRef = useRef(null);
  const instanceRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !viewerRef.current || !fileName) return;

    const initializeWebViewer = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/ppt/preview/${fileName}`;
        
        // Initialize WebViewer
        const instance = await WebViewerComponent({
          path: '/webviewer/lib',
          initialDoc: url,
          enableFilePicker: false,
          showToolbarControl: isEditing,
        }, viewerRef.current);

        instanceRef.current = instance;

        // Get the document viewer instance
        const { docViewer } = instance;
        
        // Handle document load
        docViewer.on('documentLoaded', () => {
          console.log('Document loaded successfully');
        });

        // Handle errors
        docViewer.on('documentError', (error) => {
          console.error('Error loading document:', error);
          setError('Failed to load document');
        });

      } catch (err) {
        console.error('Error initializing WebViewer:', err);
        setError(err.message);
      }
    };

    initializeWebViewer();

    // Cleanup
    return () => {
      if (instanceRef.current) {
        instanceRef.current.dispose();
      }
    };
  }, [fileName, isEditing, isClient]);

  const handleSave = async () => {
    if (!instanceRef.current) return;

    try {
      const { docViewer } = instanceRef.current;
      const doc = docViewer.getDocument();
      
      // Get the modified document as a blob
      const blob = await doc.getFileData();
      
      // Create form data
      const formData = new FormData();
      formData.append('file', blob, fileName);
      formData.append('filename', fileName);

      // Send to server
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/edit-ppt`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? 'Switch to Preview' : 'Enable Editing'}
        </button>
        {isEditing && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="h-[600px] w-full rounded-xl overflow-hidden">
        {error && <p className="text-red-500">{error}</p>}
        {isClient ? (
          <div ref={viewerRef} className="h-full w-full" />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p>Loading viewer...</p>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Note: Editing mode allows you to modify the presentation. Save to apply changes.
      </p>
    </div>
  );
}