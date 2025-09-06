
import { resourceCategories } from '../../data/resourceCategories';
import { Link } from 'react-router-dom';
import ResourceCategory from './ResourceCategory';

const ResourcesCategoryList = () => (
  <div className="mx-auto mt-16 max-w-7xl">
    {resourceCategories.map((category) => (
      <ResourceCategory
        key={category.title}
        title={category.title}
        icon={category.icon}
        color={category.color}
        resources={category.resources}
      />
    ))}
  </div>
);

export default ResourcesCategoryList;
