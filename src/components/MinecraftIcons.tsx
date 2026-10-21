import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Diamond Pickaxe (Classic Minecraft 16x16)
export const DiamondPickaxe: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Pickaxe Head (Diamond) */}
    <rect x="7" y="1" width="6" height="2" fill="#55ffff" />
    <rect x="6" y="2" width="2" height="1" fill="#2bbcc3" />
    <rect x="13" y="2" width="2" height="2" fill="#2bbcc3" />
    <rect x="14" y="4" width="1" height="2" fill="#1b7c81" />
    <rect x="5" y="3" width="2" height="2" fill="#2bbcc3" />
    <rect x="4" y="5" width="1" height="2" fill="#1b7c81" />
    <rect x="8" y="2" width="4" height="2" fill="#ffffff" />
    
    {/* Wooden Stick */}
    <rect x="9" y="4" width="2" height="2" fill="#4a3018" />
    <rect x="8" y="5" width="2" height="2" fill="#8f673a" />
    <rect x="7" y="6" width="2" height="2" fill="#4a3018" />
    <rect x="6" y="7" width="2" height="2" fill="#8f673a" />
    <rect x="5" y="8" width="2" height="2" fill="#4a3018" />
    <rect x="4" y="9" width="2" height="2" fill="#8f673a" />
    <rect x="3" y="10" width="2" height="2" fill="#4a3018" />
    <rect x="2" y="11" width="2" height="2" fill="#8f673a" />
    <rect x="1" y="12" width="2" height="2" fill="#4a3018" />
    <rect x="0" y="13" width="2" height="2" fill="#2a1a0c" />
  </svg>
);

// 2. Diamond Sword
export const DiamondSword: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Blade Tip */}
    <rect x="14" y="1" width="1" height="1" fill="#ffffff" />
    <rect x="13" y="1" width="1" height="2" fill="#55ffff" />
    <rect x="12" y="2" width="2" height="2" fill="#ffffff" />
    <rect x="11" y="3" width="2" height="2" fill="#55ffff" />
    <rect x="10" y="4" width="2" height="2" fill="#2bbcc3" />
    <rect x="9" y="5" width="2" height="2" fill="#55ffff" />
    <rect x="8" y="6" width="2" height="2" fill="#2bbcc3" />
    <rect x="7" y="7" width="2" height="2" fill="#55ffff" />
    <rect x="6" y="8" width="2" height="2" fill="#2bbcc3" />
    {/* Guard */}
    <rect x="4" y="9" width="3" height="1" fill="#2bbcc3" />
    <rect x="7" y="9" width="2" height="1" fill="#1b7c81" />
    <rect x="9" y="9" width="1" height="2" fill="#1b7c81" />
    <rect x="5" y="10" width="2" height="1" fill="#4a3018" />
    <rect x="3" y="9" width="1" height="2" fill="#1b7c81" />
    {/* Handle */}
    <rect x="3" y="11" width="2" height="2" fill="#8f673a" />
    <rect x="2" y="12" width="2" height="2" fill="#4a3018" />
    {/* Pommel */}
    <rect x="1" y="13" width="2" height="2" fill="#2bbcc3" />
    <rect x="0" y="14" width="2" height="2" fill="#1b7c81" />
  </svg>
);

// 3. Diamond Gem
export const DiamondGem: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="5" y="3" width="6" height="1" fill="#2bbcc3" />
    <rect x="4" y="4" width="8" height="2" fill="#55ffff" />
    <rect x="5" y="4" width="4" height="2" fill="#ffffff" />
    <rect x="3" y="6" width="10" height="2" fill="#2bbcc3" />
    <rect x="5" y="6" width="4" height="1" fill="#55ffff" />
    <rect x="4" y="8" width="8" height="2" fill="#2bbcc3" />
    <rect x="5" y="10" width="6" height="2" fill="#1b7c81" />
    <rect x="6" y="12" width="4" height="2" fill="#12565a" />
    <rect x="7" y="14" width="2" height="1" fill="#0d3c3f" />
  </svg>
);

// 4. Emerald Gem
export const EmeraldGem: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="5" y="3" width="6" height="1" fill="#17dd62" />
    <rect x="4" y="4" width="8" height="2" fill="#6df39e" />
    <rect x="5" y="4" width="3" height="2" fill="#ffffff" />
    <rect x="3" y="6" width="10" height="4" fill="#17dd62" />
    <rect x="5" y="6" width="4" height="2" fill="#6df39e" />
    <rect x="4" y="10" width="8" height="2" fill="#0ea745" />
    <rect x="5" y="12" width="6" height="2" fill="#0a702e" />
  </svg>
);

// 5. Redstone Dust
export const RedstoneDust: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="6" y="4" width="4" height="3" fill="#ff4d4d" />
    <rect x="7" y="5" width="2" height="1" fill="#ffffff" />
    <rect x="4" y="7" width="8" height="4" fill="#e60000" />
    <rect x="5" y="8" width="3" height="2" fill="#ff4d4d" />
    <rect x="3" y="9" width="10" height="3" fill="#990000" />
    <rect x="5" y="11" width="6" height="2" fill="#660000" />
    <rect x="2" y="11" width="2" height="2" fill="#ff4d4d" />
    <rect x="12" y="11" width="2" height="2" fill="#e60000" />
  </svg>
);

// 6. Golden Apple
export const GoldenApple: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Stem */}
    <rect x="8" y="2" width="2" height="3" fill="#4a3018" />
    <rect x="10" y="3" width="1" height="1" fill="#2a1a0c" />
    {/* Apple Body */}
    <rect x="5" y="5" width="6" height="8" fill="#fcee4b" />
    <rect x="4" y="6" width="8" height="6" fill="#fcee4b" />
    <rect x="6" y="5" width="2" height="2" fill="#ffffff" />
    <rect x="5" y="7" width="2" height="2" fill="#ffffff" />
    <rect x="3" y="7" width="1" height="4" fill="#cbb321" />
    <rect x="12" y="7" width="1" height="4" fill="#cbb321" />
    <rect x="5" y="12" width="6" height="2" fill="#a48c12" />
    <rect x="6" y="13" width="4" height="1" fill="#756209" />
  </svg>
);

// 7. Crafting Table
export const CraftingTable: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Table Top Surface */}
    <rect x="1" y="1" width="14" height="5" fill="#a07449" />
    <rect x="2" y="2" width="5" height="1" fill="#c89965" />
    <rect x="9" y="2" width="5" height="1" fill="#c89965" />
    <rect x="2" y="4" width="5" height="1" fill="#c89965" />
    <rect x="9" y="4" width="5" height="1" fill="#c89965" />
    <rect x="7" y="1" width="2" height="5" fill="#583c21" />
    {/* Table Body */}
    <rect x="1" y="6" width="14" height="9" fill="#755030" />
    {/* Tools on side */}
    <rect x="3" y="8" width="3" height="4" fill="#3a2514" />
    <rect x="10" y="8" width="3" height="4" fill="#3a2514" />
    <rect x="4" y="9" width="1" height="2" fill="#c6c6c6" />
    <rect x="11" y="9" width="1" height="2" fill="#55ffff" />
  </svg>
);

// 8. Chest
export const ChestIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Chest Body */}
    <rect x="1" y="2" width="14" height="12" fill="#8f6032" />
    <rect x="2" y="3" width="12" height="10" fill="#a4723c" />
    {/* Outer Rim */}
    <rect x="1" y="2" width="14" height="1" fill="#4a3018" />
    <rect x="1" y="7" width="14" height="1" fill="#352110" />
    <rect x="1" y="13" width="14" height="1" fill="#352110" />
    <rect x="1" y="2" width="1" height="12" fill="#4a3018" />
    <rect x="14" y="2" width="1" height="12" fill="#352110" />
    {/* Lock */}
    <rect x="7" y="6" width="2" height="3" fill="#c6c6c6" />
    <rect x="7" y="7" width="2" height="1" fill="#333333" />
  </svg>
);

// 9. Enchanted Book
export const EnchantedBook: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Book Cover */}
    <rect x="3" y="2" width="10" height="12" fill="#9e3039" />
    <rect x="4" y="3" width="8" height="10" fill="#7d1f27" />
    {/* Pages */}
    <rect x="12" y="4" width="2" height="8" fill="#e8dec3" />
    {/* Enchanted Ribbon & Corner (Purple / Gold) */}
    <rect x="7" y="1" width="2" height="14" fill="#a855f7" />
    <rect x="8" y="2" width="1" height="12" fill="#d8b4fe" />
    <rect x="5" y="7" width="6" height="2" fill="#fcee4b" />
    {/* Corner Gold Trim */}
    <rect x="3" y="2" width="2" height="2" fill="#fcee4b" />
    <rect x="3" y="12" width="2" height="2" fill="#fcee4b" />
  </svg>
);

// 10. Totem of Undying
export const TotemIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Head */}
    <rect x="5" y="2" width="6" height="4" fill="#fcee4b" />
    {/* Emerald Eyes */}
    <rect x="5" y="3" width="2" height="1" fill="#17dd62" />
    <rect x="9" y="3" width="2" height="1" fill="#17dd62" />
    {/* Wings / Arms */}
    <rect x="2" y="5" width="12" height="2" fill="#fcee4b" />
    <rect x="2" y="7" width="2" height="3" fill="#cbb321" />
    <rect x="12" y="7" width="2" height="3" fill="#cbb321" />
    {/* Torso */}
    <rect x="5" y="6" width="6" height="5" fill="#fcee4b" />
    <rect x="6" y="8" width="4" height="2" fill="#17dd62" />
    {/* Base */}
    <rect x="6" y="11" width="4" height="3" fill="#cbb321" />
  </svg>
);

// 11. Heart Container
export const HeartIcon: React.FC<IconProps & { state?: 'full' | 'half' | 'empty' }> = ({
  className = '',
  size = 18,
  state = 'full',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 9 9"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Black / Dark border */}
    <rect x="1" y="0" width="3" height="1" fill="#000000" />
    <rect x="5" y="0" width="3" height="1" fill="#000000" />
    <rect x="0" y="1" width="1" height="4" fill="#000000" />
    <rect x="8" y="1" width="1" height="4" fill="#000000" />
    <rect x="4" y="1" width="1" height="2" fill="#000000" />
    <rect x="1" y="5" width="1" height="2" fill="#000000" />
    <rect x="7" y="5" width="1" height="2" fill="#000000" />
    <rect x="2" y="6" width="1" height="1" fill="#000000" />
    <rect x="6" y="6" width="1" height="1" fill="#000000" />
    <rect x="3" y="7" width="1" height="1" fill="#000000" />
    <rect x="5" y="7" width="1" height="1" fill="#000000" />
    <rect x="4" y="8" width="1" height="1" fill="#000000" />

    {/* Background (Dark Red / Empty) */}
    <rect x="1" y="1" width="3" height="4" fill={state === 'empty' ? '#3b1212' : '#e60000'} />
    <rect x="5" y="1" width="3" height="4" fill={state === 'empty' || state === 'half' ? '#3b1212' : '#e60000'} />
    <rect x="2" y="5" width="2" height="1" fill={state === 'empty' ? '#3b1212' : '#e60000'} />
    <rect x="5" y="5" width="2" height="1" fill={state === 'empty' || state === 'half' ? '#3b1212' : '#e60000'} />
    <rect x="3" y="6" width="3" height="1" fill={state === 'empty' ? '#3b1212' : state === 'half' ? '#e60000' : '#e60000'} />
    <rect x="4" y="7" width="1" height="1" fill={state === 'empty' ? '#3b1212' : '#e60000'} />

    {/* White Specular Glint */}
    {state !== 'empty' && <rect x="2" y="1" width="1" height="1" fill="#ffffff" />}
  </svg>
);

// 12. Food / Drumstick Icon
export const DrumstickIcon: React.FC<IconProps> = ({ className = '', size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 9 9"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Bone */}
    <rect x="6" y="1" width="2" height="1" fill="#dcd6c8" />
    <rect x="7" y="2" width="1" height="2" fill="#dcd6c8" />
    <rect x="5" y="2" width="2" height="2" fill="#9f998d" />
    {/* Meat Body */}
    <rect x="2" y="3" width="4" height="4" fill="#a85324" />
    <rect x="1" y="4" width="5" height="3" fill="#873f15" />
    <rect x="2" y="4" width="2" height="1" fill="#d8783e" />
    <rect x="3" y="7" width="2" height="1" fill="#5c2607" />
  </svg>
);

// 13. Grass Block (Isometric / Front View)
export const GrassBlockIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Dirt */}
    <rect x="0" y="0" width="16" height="16" fill="#866043" />
    <rect x="3" y="7" width="2" height="2" fill="#573d26" />
    <rect x="9" y="10" width="3" height="2" fill="#573d26" />
    <rect x="4" y="13" width="2" height="2" fill="#573d26" />
    <rect x="12" y="6" width="2" height="2" fill="#573d26" />
    {/* Green Grass Top & Dripping Roots */}
    <rect x="0" y="0" width="16" height="4" fill="#5c8e32" />
    <rect x="1" y="4" width="2" height="2" fill="#5c8e32" />
    <rect x="5" y="4" width="2" height="3" fill="#5c8e32" />
    <rect x="9" y="4" width="2" height="1" fill="#5c8e32" />
    <rect x="12" y="4" width="3" height="2" fill="#5c8e32" />
    {/* Highlights */}
    <rect x="2" y="1" width="3" height="1" fill="#7ec046" />
    <rect x="8" y="1" width="4" height="1" fill="#7ec046" />
  </svg>
);

// 14. Diamond Ore Block
export const DiamondOreIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Stone Base */}
    <rect x="0" y="0" width="16" height="16" fill="#737373" />
    <rect x="2" y="2" width="4" height="2" fill="#828282" />
    <rect x="10" y="11" width="4" height="3" fill="#5c5c5c" />
    <rect x="1" y="12" width="3" height="2" fill="#5c5c5c" />
    <rect x="11" y="2" width="3" height="2" fill="#828282" />
    {/* Diamond Flecks */}
    <rect x="3" y="4" width="2" height="2" fill="#55ffff" />
    <rect x="4" y="4" width="1" height="1" fill="#ffffff" />
    <rect x="4" y="6" width="2" height="1" fill="#2bbcc3" />

    <rect x="9" y="4" width="3" height="2" fill="#55ffff" />
    <rect x="10" y="4" width="1" height="1" fill="#ffffff" />
    <rect x="11" y="6" width="2" height="2" fill="#2bbcc3" />

    <rect x="5" y="9" width="3" height="2" fill="#55ffff" />
    <rect x="6" y="9" width="1" height="1" fill="#ffffff" />
    <rect x="7" y="11" width="2" height="2" fill="#2bbcc3" />

    <rect x="2" y="9" width="2" height="2" fill="#2bbcc3" />
    <rect x="12" y="9" width="2" height="2" fill="#55ffff" />
  </svg>
);

// 15. Creeper Face
export const CreeperFace: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect width="16" height="16" fill="#4ea832" />
    <rect x="2" y="2" width="4" height="3" fill="#62c43e" />
    {/* Eyes */}
    <rect x="2" y="4" width="4" height="4" fill="#000000" />
    <rect x="10" y="4" width="4" height="4" fill="#000000" />
    {/* Nose & Mouth */}
    <rect x="6" y="7" width="4" height="5" fill="#000000" />
    <rect x="4" y="9" width="2" height="5" fill="#000000" />
    <rect x="10" y="9" width="2" height="5" fill="#000000" />
  </svg>
);

// 16. Compass
export const CompassIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Iron Casing */}
    <rect x="5" y="1" width="6" height="1" fill="#717171" />
    <rect x="3" y="2" width="10" height="1" fill="#999999" />
    <rect x="2" y="3" width="12" height="10" fill="#717171" />
    <rect x="3" y="13" width="10" height="1" fill="#4a4a4a" />
    <rect x="5" y="14" width="6" height="1" fill="#303030" />
    {/* Compass Dial Face */}
    <rect x="4" y="4" width="8" height="8" fill="#1b1d24" />
    {/* Red Needle pointing North */}
    <rect x="7" y="5" width="2" height="3" fill="#ff3333" />
    <rect x="6" y="7" width="4" height="2" fill="#ffffff" />
    {/* Needle Base */}
    <rect x="7" y="9" width="2" height="2" fill="#888888" />
  </svg>
);

// 17. Cherry Blossom Petal / Icon
export const CherryBlossomIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="6" y="2" width="4" height="3" fill="#f472b6" />
    <rect x="2" y="6" width="3" height="4" fill="#f472b6" />
    <rect x="11" y="6" width="3" height="4" fill="#f472b6" />
    <rect x="4" y="10" width="3" height="3" fill="#f472b6" />
    <rect x="9" y="10" width="3" height="3" fill="#f472b6" />
    {/* Center */}
    <rect x="6" y="6" width="4" height="4" fill="#fdf2f8" />
    <rect x="7" y="7" width="2" height="2" fill="#fb7185" />
  </svg>
);

// 18. Nether Star / Embers Icon
export const NetherStarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="7" y="1" width="2" height="14" fill="#f97316" />
    <rect x="1" y="7" width="14" height="2" fill="#f97316" />
    <rect x="4" y="4" width="8" height="8" fill="#ef4444" />
    <rect x="6" y="6" width="4" height="4" fill="#fef08a" />
    <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
  </svg>
);

// 19. Ender Eye
export const EnderEyeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="4" y="2" width="8" height="12" fill="#0d9488" />
    <rect x="2" y="4" width="12" height="8" fill="#14b8a6" />
    <rect x="6" y="5" width="4" height="6" fill="#a855f7" />
    <rect x="7" y="6" width="2" height="4" fill="#e9d5ff" />
    <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
  </svg>
);

// 20. Snowflake / Frozen Icon
export const SnowflakeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="7" y="2" width="2" height="12" fill="#bae6fd" />
    <rect x="2" y="7" width="12" height="2" fill="#bae6fd" />
    <rect x="5" y="5" width="2" height="2" fill="#ffffff" />
    <rect x="9" y="5" width="2" height="2" fill="#ffffff" />
    <rect x="5" y="9" width="2" height="2" fill="#ffffff" />
    <rect x="9" y="9" width="2" height="2" fill="#ffffff" />
    <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
  </svg>
);
