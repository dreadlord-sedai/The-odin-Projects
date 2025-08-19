// src/modules/Storage.js

const Storage = (() => {
  const saveProjects = (projects) => {
    localStorage.setItem('todoProjects', JSON.stringify(projects));
  };

  const loadProjects = () => {
    const data = localStorage.getItem('todoProjects');
    if (!data) return [];
    return JSON.parse(data);
  };

  return {
    saveProjects,
    loadProjects,
  };
})();

export default Storage;
