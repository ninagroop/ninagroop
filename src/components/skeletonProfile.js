import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonProfile = () => {
  return (
    <ContentLoader
      speed={2}
      animate={true}
      width={300}
      height={240}
      viewBox="0 0 400 240"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <circle cx="223" cy="59" r="29" />
      <rect x="145" y="120" rx="0" ry="0" width="156" height="8" />
      <rect x="174" y="137" rx="0" ry="0" width="100" height="8" />
      <rect x="218" y="128" rx="0" ry="0" width="0" height="1" />
      <rect x="222" y="166" rx="0" ry="0" width="1" height="0" />
      <rect x="145" y="160" rx="0" ry="0" width="156" height="25" />
    </ContentLoader>
  );
};

export default SkeletonProfile;
