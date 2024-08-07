import React from 'react';

const DownloadRDF = ({ rdfContent }) => {
  const downloadRDF = () => {
    if (!rdfContent) {
      console.error('No RDF content generated');
      return;
    }
    const blob = new Blob([rdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'knowledge_graph.nt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadRDF}>Download RDF</button>
  );
};

export default DownloadRDF;
