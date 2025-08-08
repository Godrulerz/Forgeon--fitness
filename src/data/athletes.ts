import { Athlete } from '../types/athletes';

export const mockAthletes: Athlete[] = [
  {
    id: 'athlete-001',
    name: 'Alex Rodriguez',
    sport: 'Soccer',
    position: 'Midfielder',
    team: 'FC Barcelona Academy',
    age: 24,
    dateOfBirth: new Date('1999-03-15'),
    height: 178,
    weight: 72,
    nationality: 'Spain',
    email: 'alex.rodriguez@fcb.com',
    phone: '+34 612 345 678',
    profilePhoto: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 8.7,
    totalAssessments: 47,
    lastAssessment: new Date('2024-12-20'),
    lastMedicalCheck: new Date('2024-12-01'),
    bio: 'Rising star midfielder with exceptional vision and passing ability. Known for his work rate and tactical intelligence. Has been with Barcelona academy since age 16 and is considered one of the most promising talents in Spanish football.',
    socialMedia: {
      instagram: 'https://instagram.com/alexrod_official',
      twitter: 'https://twitter.com/alexrod10',
      facebook: 'https://facebook.com/alexrodriguez.official'
    },
    performanceMetrics: [
      {
        id: 'vo2max-alex',
        name: 'VO₂ Max',
        category: 'endurance',
        value: 58.3,
        unit: 'ml/kg/min',
        changePercent: 3.2,
        trend: 'up',
        trendData: [54.2, 55.1, 56.3, 57.2, 58.3, 57.9, 58.3],
        percentile: 85,
        lastUpdated: new Date('2024-12-20')
      },
      {
        id: 'vertical-jump-alex',
        name: 'Vertical Jump',
        category: 'power',
        value: 62.5,
        unit: 'cm',
        changePercent: 2.1,
        trend: 'up',
        trendData: [58.1, 59.2, 60.0, 61.8, 62.5, 61.9, 62.5],
        percentile: 78,
        lastUpdated: new Date('2024-12-19')
      },
      {
        id: 'sprint-30m-alex',
        name: '30m Sprint',
        category: 'speed',
        value: 4.12,
        unit: 's',
        changePercent: -2.8,
        trend: 'up',
        trendData: [4.35, 4.28, 4.22, 4.18, 4.15, 4.12, 4.12],
        percentile: 82,
        lastUpdated: new Date('2024-12-18')
      },
      {
        id: 'body-fat-alex',
        name: 'Body Fat',
        category: 'body_composition',
        value: 9.8,
        unit: '%',
        changePercent: -1.2,
        trend: 'up',
        trendData: [10.8, 10.5, 10.2, 9.9, 9.8, 9.9, 9.8],
        percentile: 90,
        lastUpdated: new Date('2024-12-17')
      },
      {
        id: 'agility-alex',
        name: 'T-Test Agility',
        category: 'agility',
        value: 9.45,
        unit: 's',
        changePercent: -1.8,
        trend: 'up',
        trendData: [9.85, 9.72, 9.58, 9.51, 9.45, 9.48, 9.45],
        percentile: 88,
        lastUpdated: new Date('2024-12-16')
      }
    ],
    achievements: [
      {
        id: 'ach-alex-1',
        title: 'La Liga Youth Player of the Month',
        description: 'Outstanding performance in youth league matches',
        date: new Date('2024-11-01'),
        level: 'National',
        category: 'Award'
      },
      {
        id: 'ach-alex-2',
        title: 'UEFA Youth League Top Scorer',
        description: 'Leading scorer in UEFA Youth League tournament',
        date: new Date('2024-09-15'),
        level: 'International',
        category: 'Record'
      },
      {
        id: 'ach-alex-3',
        title: 'Spain U-21 Call-up',
        description: 'First call-up to Spain Under-21 national team',
        date: new Date('2024-08-20'),
        level: 'International',
        category: 'Milestone'
      }
    ],
    injuryHistory: [
      {
        id: 'inj-alex-1',
        type: 'Ankle Sprain',
        description: 'Grade 1 ankle sprain during training',
        date: new Date('2024-06-15'),
        recoveryDate: new Date('2024-07-01'),
        severity: 'minor',
        affectedArea: 'Left Ankle',
        treatment: 'Rest, ice, physiotherapy',
        status: 'recovered'
      }
    ],
    upcomingEvents: [
      {
        id: 'event-alex-1',
        name: 'El Clasico Youth Match',
        date: new Date('2024-12-28'),
        type: 'Competition',
        location: 'Camp Nou, Barcelona',
        importance: 'high'
      },
      {
        id: 'event-alex-2',
        name: 'Quarterly Fitness Assessment',
        date: new Date('2025-01-05'),
        type: 'Assessment',
        location: 'Training Center',
        importance: 'medium'
      }
    ],
    recentNews: [
      {
        id: 'news-alex-1',
        title: 'Rodriguez Shines in Youth Derby',
        summary: 'Two assists and a goal in 3-1 victory over Real Madrid youth team',
        date: new Date('2024-12-15'),
        source: 'FC Barcelona Official',
        type: 'performance'
      }
    ]
  },
  {
    id: 'athlete-002',
    name: 'Emma Johnson',
    sport: 'Basketball',
    position: 'Point Guard',
    team: 'Stanford Cardinal',
    age: 22,
    dateOfBirth: new Date('2001-07-22'),
    height: 168,
    weight: 58,
    nationality: 'USA',
    email: 'emma.johnson@stanford.edu',
    phone: '+1 650 555 0123',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 9.1,
    totalAssessments: 52,
    lastAssessment: new Date('2024-12-19'),
    lastMedicalCheck: new Date('2024-11-28'),
    bio: 'Elite point guard with exceptional court vision and leadership skills. Three-time All-Pac-12 selection and team captain. Known for her clutch performances and ability to elevate teammates\' play. Projected first-round WNBA draft pick.',
    socialMedia: {
      instagram: 'https://instagram.com/emmaj_hoops',
      twitter: 'https://twitter.com/emmajohnson_pg'
    },
    performanceMetrics: [
      {
        id: 'vo2max-emma',
        name: 'VO₂ Max',
        category: 'endurance',
        value: 52.1,
        unit: 'ml/kg/min',
        changePercent: -1.8,
        trend: 'down',
        trendData: [55.2, 54.8, 53.9, 53.1, 52.8, 52.1, 52.1],
        percentile: 68,
        lastUpdated: new Date('2024-12-19')
      },
      {
        id: 'vertical-jump-emma',
        name: 'Vertical Jump',
        category: 'power',
        value: 58.8,
        unit: 'cm',
        changePercent: 4.2,
        trend: 'up',
        trendData: [54.1, 55.2, 56.8, 57.5, 58.8, 58.2, 58.8],
        percentile: 82,
        lastUpdated: new Date('2024-12-18')
      },
      {
        id: 'agility-emma',
        name: 'T-Test Agility',
        category: 'agility',
        value: 9.85,
        unit: 's',
        changePercent: -3.1,
        trend: 'up',
        trendData: [10.45, 10.28, 10.12, 9.98, 9.85, 9.92, 9.85],
        percentile: 88,
        lastUpdated: new Date('2024-12-17')
      },
      {
        id: 'bench-press-emma',
        name: 'Bench Press',
        category: 'strength',
        value: 65,
        unit: 'kg',
        changePercent: 2.7,
        trend: 'up',
        trendData: [58, 60, 62, 64, 65, 64, 65],
        percentile: 75,
        lastUpdated: new Date('2024-12-16')
      }
    ],
    achievements: [
      {
        id: 'ach-emma-1',
        title: 'Pac-12 Player of the Year',
        description: 'Outstanding season performance leading Stanford to conference title',
        date: new Date('2024-03-15'),
        level: 'National',
        category: 'Award'
      },
      {
        id: 'ach-emma-2',
        title: 'NCAA Tournament Elite Eight',
        description: 'Led team to Elite Eight with clutch performances',
        date: new Date('2024-03-28'),
        level: 'National',
        category: 'Competition'
      },
      {
        id: 'ach-emma-3',
        title: 'USA Basketball U23 Team',
        description: 'Selected for USA Basketball Under-23 national team',
        date: new Date('2024-05-10'),
        level: 'International',
        category: 'Milestone'
      }
    ],
    injuryHistory: [],
    upcomingEvents: [
      {
        id: 'event-emma-1',
        name: 'Pac-12 Championship',
        date: new Date('2025-03-08'),
        type: 'Competition',
        location: 'Las Vegas, NV',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-emma-1',
        title: 'Johnson Named Preseason All-American',
        summary: 'Third consecutive preseason All-American selection',
        date: new Date('2024-10-15'),
        source: 'ESPN',
        type: 'achievement'
      }
    ]
  },
  {
    id: 'athlete-003',
    name: 'Marcus Chen',
    sport: 'Track & Field',
    position: 'Sprinter (100m/200m)',
    team: 'Nike Oregon Project',
    age: 26,
    dateOfBirth: new Date('1997-11-08'),
    height: 185,
    weight: 78,
    nationality: 'Canada',
    email: 'marcus.chen@nike.com',
    phone: '+1 503 555 0456',
    profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 9.4,
    totalAssessments: 68,
    lastAssessment: new Date('2024-12-18'),
    lastMedicalCheck: new Date('2024-12-05'),
    bio: 'World-class sprinter specializing in 100m and 200m events. Current Canadian record holder in 100m with a personal best of 9.84s. Two-time Olympic finalist and World Championship medalist. Known for his explosive start and strong finish.',
    socialMedia: {
      instagram: 'https://instagram.com/marcuschen_speed',
      twitter: 'https://twitter.com/mchen_track'
    },
    performanceMetrics: [
      {
        id: 'sprint-100m-marcus',
        name: '100m Sprint',
        category: 'speed',
        value: 9.84,
        unit: 's',
        changePercent: -1.2,
        trend: 'up',
        trendData: [10.12, 10.05, 9.98, 9.92, 9.84, 9.88, 9.84],
        percentile: 98,
        lastUpdated: new Date('2024-12-18')
      },
      {
        id: 'power-marcus',
        name: 'Wingate Peak Power',
        category: 'power',
        value: 1420,
        unit: 'W',
        changePercent: 5.8,
        trend: 'up',
        trendData: [1280, 1320, 1360, 1390, 1420, 1410, 1420],
        percentile: 95,
        lastUpdated: new Date('2024-12-17')
      },
      {
        id: 'reaction-time-marcus',
        name: 'Reaction Time',
        category: 'speed',
        value: 0.142,
        unit: 's',
        changePercent: -8.4,
        trend: 'up',
        trendData: [0.168, 0.162, 0.155, 0.148, 0.142, 0.145, 0.142],
        percentile: 88,
        lastUpdated: new Date('2024-12-16')
      },
      {
        id: 'body-fat-marcus',
        name: 'Body Fat',
        category: 'body_composition',
        value: 7.2,
        unit: '%',
        changePercent: -0.5,
        trend: 'stable',
        trendData: [7.8, 7.6, 7.4, 7.3, 7.2, 7.2, 7.2],
        percentile: 95,
        lastUpdated: new Date('2024-12-15')
      }
    ],
    achievements: [
      {
        id: 'ach-marcus-1',
        title: 'Canadian 100m Record',
        description: 'Set new Canadian national record with 9.84s',
        date: new Date('2024-07-20'),
        level: 'National',
        category: 'Record'
      },
      {
        id: 'ach-marcus-2',
        title: 'World Championships Bronze',
        description: 'Bronze medal in 100m at World Athletics Championships',
        date: new Date('2024-07-15'),
        level: 'International',
        category: 'Competition'
      },
      {
        id: 'ach-marcus-3',
        title: 'Olympic Finalist',
        description: 'Reached 100m final at Paris Olympics',
        date: new Date('2024-08-04'),
        level: 'International',
        category: 'Competition'
      }
    ],
    injuryHistory: [
      {
        id: 'inj-marcus-1',
        type: 'Hamstring Strain',
        description: 'Grade 2 hamstring strain during training',
        date: new Date('2024-04-10'),
        recoveryDate: new Date('2024-05-15'),
        severity: 'moderate',
        affectedArea: 'Right Hamstring',
        treatment: 'Physiotherapy, gradual return to training',
        status: 'recovered'
      }
    ],
    upcomingEvents: [
      {
        id: 'event-marcus-1',
        name: 'Diamond League Final',
        date: new Date('2025-09-07'),
        type: 'Competition',
        location: 'Eugene, Oregon',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-marcus-1',
        title: 'Chen Breaks Training Ground Record',
        summary: 'Unofficial 9.82s in training session sparks excitement',
        date: new Date('2024-12-10'),
        source: 'Track & Field News',
        type: 'performance'
      }
    ]
  },
  {
    id: 'athlete-004',
    name: 'Sofia Martinez',
    sport: 'Swimming',
    position: 'Distance Freestyle',
    team: 'Cal Berkeley Aquatics',
    age: 20,
    dateOfBirth: new Date('2003-12-03'),
    height: 172,
    weight: 62,
    nationality: 'Mexico',
    email: 'sofia.martinez@berkeley.edu',
    phone: '+1 510 555 0789',
    profilePhoto: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 8.9,
    totalAssessments: 41,
    lastAssessment: new Date('2024-12-17'),
    lastMedicalCheck: new Date('2024-11-20'),
    bio: 'Elite distance swimmer with exceptional endurance and technique. Current NCAA record holder in 1500m freestyle. Known for her strong finishing kick and mental toughness in long-distance events. Targeting 2028 Olympics.',
    socialMedia: {
      instagram: 'https://instagram.com/sofia_swims',
      twitter: 'https://twitter.com/sofiamartinez_swim'
    },
    performanceMetrics: [
      {
        id: 'vo2max-sofia',
        name: 'VO₂ Max',
        category: 'endurance',
        value: 64.2,
        unit: 'ml/kg/min',
        changePercent: 1.8,
        trend: 'up',
        trendData: [61.8, 62.5, 63.1, 63.8, 64.2, 63.9, 64.2],
        percentile: 98,
        lastUpdated: new Date('2024-12-17')
      },
      {
        id: 'lactate-threshold-sofia',
        name: 'Lactate Threshold',
        category: 'endurance',
        value: 4.2,
        unit: 'mmol/L',
        changePercent: -2.1,
        trend: 'up',
        trendData: [4.8, 4.6, 4.5, 4.3, 4.2, 4.3, 4.2],
        percentile: 85,
        lastUpdated: new Date('2024-12-16')
      },
      {
        id: 'shoulder-flexibility-sofia',
        name: 'Shoulder Flexibility',
        category: 'flexibility',
        value: 185,
        unit: '°',
        changePercent: 2.8,
        trend: 'up',
        trendData: [175, 178, 180, 182, 185, 184, 185],
        percentile: 92,
        lastUpdated: new Date('2024-12-15')
      },
      {
        id: 'core-strength-sofia',
        name: 'Plank Hold',
        category: 'strength',
        value: 285,
        unit: 's',
        changePercent: 8.2,
        trend: 'up',
        trendData: [245, 255, 265, 275, 285, 280, 285],
        percentile: 88,
        lastUpdated: new Date('2024-12-14')
      }
    ],
    achievements: [
      {
        id: 'ach-sofia-1',
        title: 'NCAA 1500m Freestyle Record',
        description: 'Set new NCAA record in 1500m freestyle',
        date: new Date('2024-03-22'),
        level: 'National',
        category: 'Record'
      },
      {
        id: 'ach-sofia-2',
        title: 'Pac-12 Swimmer of the Year',
        description: 'Outstanding season performance across multiple events',
        date: new Date('2024-02-28'),
        level: 'National',
        category: 'Award'
      }
    ],
    injuryHistory: [],
    upcomingEvents: [
      {
        id: 'event-sofia-1',
        name: 'NCAA Championships',
        date: new Date('2025-03-20'),
        type: 'Competition',
        location: 'Indianapolis, IN',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-sofia-1',
        title: 'Martinez Qualifies for World Championships',
        summary: 'Achieved qualifying time in 1500m freestyle at winter nationals',
        date: new Date('2024-12-05'),
        source: 'Swimming World',
        type: 'achievement'
      }
    ]
  },
  {
    id: 'athlete-005',
    name: 'James Wilson',
    sport: 'Football',
    position: 'Linebacker',
    team: 'Alabama Crimson Tide',
    age: 23,
    dateOfBirth: new Date('2000-09-12'),
    height: 193,
    weight: 102,
    nationality: 'USA',
    email: 'james.wilson@alabama.edu',
    phone: '+1 205 555 0321',
    profilePhoto: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 8.5,
    totalAssessments: 39,
    lastAssessment: new Date('2024-12-16'),
    lastMedicalCheck: new Date('2024-12-10'),
    bio: 'Dominant linebacker with exceptional instincts and leadership qualities. Team captain and defensive signal caller. Known for his ability to read offenses and make game-changing plays. Projected early-round NFL draft pick.',
    socialMedia: {
      instagram: 'https://instagram.com/jameswilson_lb',
      twitter: 'https://twitter.com/jwilson_football'
    },
    performanceMetrics: [
      {
        id: 'bench-press-james',
        name: '1RM Bench Press',
        category: 'strength',
        value: 145,
        unit: 'kg',
        changePercent: 6.2,
        trend: 'up',
        trendData: [132, 135, 138, 142, 145, 144, 145],
        percentile: 85,
        lastUpdated: new Date('2024-12-16')
      },
      {
        id: 'squat-james',
        name: '1RM Squat',
        category: 'strength',
        value: 185,
        unit: 'kg',
        changePercent: 4.8,
        trend: 'up',
        trendData: [168, 172, 176, 180, 185, 183, 185],
        percentile: 88,
        lastUpdated: new Date('2024-12-15')
      },
      {
        id: 'agility-james',
        name: '5-10-5 Shuttle',
        category: 'agility',
        value: 4.28,
        unit: 's',
        changePercent: -1.8,
        trend: 'up',
        trendData: [4.45, 4.42, 4.38, 4.32, 4.28, 4.30, 4.28],
        percentile: 82,
        lastUpdated: new Date('2024-12-14')
      },
      {
        id: 'vertical-jump-james',
        name: 'Vertical Jump',
        category: 'power',
        value: 76,
        unit: 'cm',
        changePercent: 3.2,
        trend: 'up',
        trendData: [70, 72, 74, 75, 76, 75, 76],
        percentile: 90,
        lastUpdated: new Date('2024-12-13')
      }
    ],
    achievements: [
      {
        id: 'ach-james-1',
        title: 'SEC Defensive Player of the Year',
        description: 'Outstanding defensive performance throughout the season',
        date: new Date('2023-12-01'),
        level: 'National',
        category: 'Award'
      },
      {
        id: 'ach-james-2',
        title: 'National Championship',
        description: 'Key contributor to Alabama\'s national championship victory',
        date: new Date('2024-01-08'),
        level: 'National',
        category: 'Competition'
      }
    ],
    injuryHistory: [
      {
        id: 'inj-james-1',
        type: 'Shoulder Strain',
        description: 'Minor shoulder strain during practice',
        date: new Date('2024-10-05'),
        recoveryDate: new Date('2024-10-20'),
        severity: 'minor',
        affectedArea: 'Right Shoulder',
        treatment: 'Rest and physiotherapy',
        status: 'recovered'
      }
    ],
    upcomingEvents: [
      {
        id: 'event-james-1',
        name: 'NFL Combine',
        date: new Date('2025-02-28'),
        type: 'Assessment',
        location: 'Indianapolis, IN',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-james-1',
        title: 'Wilson Declares for NFL Draft',
        summary: 'Alabama linebacker announces intention to enter NFL draft',
        date: new Date('2024-12-12'),
        source: 'ESPN',
        type: 'general'
      }
    ]
  },
  {
    id: 'athlete-006',
    name: 'Maya Patel',
    sport: 'Tennis',
    position: 'Singles Player',
    team: 'IMG Academy',
    age: 19,
    dateOfBirth: new Date('2004-05-18'),
    height: 165,
    weight: 55,
    nationality: 'India',
    email: 'maya.patel@imgacademy.com',
    phone: '+1 941 555 0654',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'recovering',
    performanceRating: 8.2,
    totalAssessments: 33,
    lastAssessment: new Date('2024-12-10'),
    lastMedicalCheck: new Date('2024-12-15'),
    bio: 'Promising young tennis player with aggressive baseline game and exceptional mental toughness. Currently ranked in WTA top 100. Known for her powerful forehand and court coverage. Recovering from minor wrist injury.',
    socialMedia: {
      instagram: 'https://instagram.com/mayapatel_tennis',
      twitter: 'https://twitter.com/mpatel_tennis'
    },
    performanceMetrics: [
      {
        id: 'agility-maya',
        name: 'Lateral Agility',
        category: 'agility',
        value: 8.95,
        unit: 's',
        changePercent: -2.5,
        trend: 'up',
        trendData: [9.45, 9.32, 9.18, 9.05, 8.95, 9.02, 8.95],
        percentile: 85,
        lastUpdated: new Date('2024-12-10')
      },
      {
        id: 'grip-strength-maya',
        name: 'Grip Strength',
        category: 'strength',
        value: 42,
        unit: 'kg',
        changePercent: 1.2,
        trend: 'stable',
        trendData: [40, 41, 41, 42, 42, 42, 42],
        percentile: 78,
        lastUpdated: new Date('2024-12-09')
      },
      {
        id: 'flexibility-maya',
        name: 'Shoulder Flexibility',
        category: 'flexibility',
        value: 178,
        unit: '°',
        changePercent: 0.8,
        trend: 'stable',
        trendData: [175, 176, 177, 178, 178, 177, 178],
        percentile: 82,
        lastUpdated: new Date('2024-12-08')
      }
    ],
    achievements: [
      {
        id: 'ach-maya-1',
        title: 'WTA 125 Tournament Winner',
        description: 'First professional title at WTA 125 event',
        date: new Date('2024-08-15'),
        level: 'International',
        category: 'Competition'
      },
      {
        id: 'ach-maya-2',
        title: 'Junior Wimbledon Semifinalist',
        description: 'Reached semifinals at Wimbledon junior championships',
        date: new Date('2023-07-08'),
        level: 'International',
        category: 'Competition'
      }
    ],
    injuryHistory: [
      {
        id: 'inj-maya-1',
        type: 'Wrist Tendinitis',
        description: 'Overuse injury affecting right wrist',
        date: new Date('2024-11-20'),
        severity: 'minor',
        affectedArea: 'Right Wrist',
        treatment: 'Rest, anti-inflammatory, physiotherapy',
        status: 'ongoing'
      }
    ],
    upcomingEvents: [
      {
        id: 'event-maya-1',
        name: 'Australian Open Qualifiers',
        date: new Date('2025-01-08'),
        type: 'Competition',
        location: 'Melbourne, Australia',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-maya-1',
        title: 'Patel Targeting Return in January',
        summary: 'Young star aims for Australian Open after wrist injury recovery',
        date: new Date('2024-12-08'),
        source: 'Tennis.com',
        type: 'injury'
      }
    ]
  },
  {
    id: 'athlete-007',
    name: 'David Kim',
    sport: 'Gymnastics',
    position: 'All-Around',
    team: 'UCLA Bruins',
    age: 21,
    dateOfBirth: new Date('2002-08-30'),
    height: 170,
    weight: 68,
    nationality: 'South Korea',
    email: 'david.kim@ucla.edu',
    phone: '+1 310 555 0987',
    profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 9.0,
    totalAssessments: 45,
    lastAssessment: new Date('2024-12-14'),
    lastMedicalCheck: new Date('2024-11-30'),
    bio: 'World-class gymnast competing in all-around events. Known for his precision, consistency, and innovative routines. Current NCAA all-around champion and member of South Korean national team. Preparing for World Championships.',
    socialMedia: {
      instagram: 'https://instagram.com/davidkim_gym',
      twitter: 'https://twitter.com/dkim_gymnastics'
    },
    performanceMetrics: [
      {
        id: 'flexibility-david',
        name: 'Overall Flexibility',
        category: 'flexibility',
        value: 95,
        unit: 'score',
        changePercent: 2.1,
        trend: 'up',
        trendData: [88, 90, 92, 94, 95, 94, 95],
        percentile: 98,
        lastUpdated: new Date('2024-12-14')
      },
      {
        id: 'power-to-weight-david',
        name: 'Power-to-Weight Ratio',
        category: 'power',
        value: 18.5,
        unit: 'W/kg',
        changePercent: 3.8,
        trend: 'up',
        trendData: [16.8, 17.2, 17.8, 18.1, 18.5, 18.3, 18.5],
        percentile: 95,
        lastUpdated: new Date('2024-12-13')
      },
      {
        id: 'balance-david',
        name: 'Static Balance',
        category: 'agility',
        value: 45,
        unit: 's',
        changePercent: 5.2,
        trend: 'up',
        trendData: [38, 40, 42, 44, 45, 44, 45],
        percentile: 92,
        lastUpdated: new Date('2024-12-12')
      }
    ],
    achievements: [
      {
        id: 'ach-david-1',
        title: 'NCAA All-Around Champion',
        description: 'Won NCAA Division I all-around championship',
        date: new Date('2024-04-13'),
        level: 'National',
        category: 'Competition'
      },
      {
        id: 'ach-david-2',
        title: 'World Championships Team',
        description: 'Selected for South Korean World Championships team',
        date: new Date('2024-09-01'),
        level: 'International',
        category: 'Milestone'
      }
    ],
    injuryHistory: [],
    upcomingEvents: [
      {
        id: 'event-david-1',
        name: 'World Gymnastics Championships',
        date: new Date('2025-10-18'),
        type: 'Competition',
        location: 'Tokyo, Japan',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-david-1',
        title: 'Kim Debuts New Pommel Horse Routine',
        summary: 'Innovative routine could change scoring in the event',
        date: new Date('2024-12-01'),
        source: 'International Gymnast',
        type: 'performance'
      }
    ]
  },
  {
    id: 'athlete-008',
    name: 'Isabella Santos',
    sport: 'Volleyball',
    position: 'Outside Hitter',
    team: 'Brazil National Team',
    age: 25,
    dateOfBirth: new Date('1998-04-25'),
    height: 188,
    weight: 70,
    nationality: 'Brazil',
    email: 'isabella.santos@cbv.org.br',
    phone: '+55 11 9876 5432',
    profilePhoto: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    performanceRating: 9.2,
    totalAssessments: 56,
    lastAssessment: new Date('2024-12-12'),
    lastMedicalCheck: new Date('2024-12-01'),
    bio: 'Elite volleyball player and key member of Brazil national team. Known for her powerful spike and exceptional blocking ability. Olympic medalist and multiple-time World Championship participant. Leader both on and off the court.',
    socialMedia: {
      instagram: 'https://instagram.com/isabellasantos_vb',
      twitter: 'https://twitter.com/isantos_volleyball'
    },
    performanceMetrics: [
      {
        id: 'vertical-jump-isabella',
        name: 'Spike Jump',
        category: 'power',
        value: 78,
        unit: 'cm',
        changePercent: 2.6,
        trend: 'up',
        trendData: [72, 74, 75, 76, 78, 77, 78],
        percentile: 95,
        lastUpdated: new Date('2024-12-12')
      },
      {
        id: 'block-jump-isabella',
        name: 'Block Jump',
        category: 'power',
        value: 72,
        unit: 'cm',
        changePercent: 1.8,
        trend: 'up',
        trendData: [68, 69, 70, 71, 72, 71, 72],
        percentile: 92,
        lastUpdated: new Date('2024-12-11')
      },
      {
        id: 'agility-isabella',
        name: 'Court Agility',
        category: 'agility',
        value: 8.75,
        unit: 's',
        changePercent: -2.2,
        trend: 'up',
        trendData: [9.15, 9.05, 8.95, 8.85, 8.75, 8.80, 8.75],
        percentile: 88,
        lastUpdated: new Date('2024-12-10')
      }
    ],
    achievements: [
      {
        id: 'ach-isabella-1',
        title: 'Olympic Bronze Medal',
        description: 'Bronze medal at Tokyo Olympics with Brazil national team',
        date: new Date('2021-08-07'),
        level: 'International',
        category: 'Competition'
      },
      {
        id: 'ach-isabella-2',
        title: 'World Championship Silver',
        description: 'Silver medal at FIVB World Championship',
        date: new Date('2022-10-15'),
        level: 'International',
        category: 'Competition'
      },
      {
        id: 'ach-isabella-3',
        title: 'Nations League MVP',
        description: 'Most Valuable Player in FIVB Nations League',
        date: new Date('2024-07-20'),
        level: 'International',
        category: 'Award'
      }
    ],
    injuryHistory: [
      {
        id: 'inj-isabella-1',
        type: 'Knee Strain',
        description: 'Minor knee strain during training',
        date: new Date('2024-08-15'),
        recoveryDate: new Date('2024-09-01'),
        severity: 'minor',
        affectedArea: 'Left Knee',
        treatment: 'Rest and strengthening exercises',
        status: 'recovered'
      }
    ],
    upcomingEvents: [
      {
        id: 'event-isabella-1',
        name: 'South American Championship',
        date: new Date('2025-02-15'),
        type: 'Competition',
        location: 'Lima, Peru',
        importance: 'high'
      }
    ],
    recentNews: [
      {
        id: 'news-isabella-1',
        title: 'Santos Leads Brazil to Victory',
        summary: '25 points in championship match against Argentina',
        date: new Date('2024-11-28'),
        source: 'FIVB Official',
        type: 'performance'
      }
    ]
  }
];