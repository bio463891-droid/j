import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { LECTURES } from '../constants/data';
import ScreenHeader from '../components/ScreenHeader';
import SecretCodeModal from '../components/SecretCodeModal';
import { verifyCode } from '../lib/verifyCode';

// ─── Lecture Row ──────────────────────────────────────────────────────────────
function LectureRow({ lecture, onPress }) {
  return (
    <TouchableOpacity
      style={styles.lectureRow}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons
        name={lecture.isUnlocked ? 'play-circle' : 'lock-closed-outline'}
        size={22}
        color={lecture.isUnlocked ? COLORS.coral : COLORS.textMuted}
      />
      <View style={styles.lectureInfo}>
        <Text style={styles.lectureTitle}>{lecture.title}</Text>
        <Text style={styles.lectureDuration}>{lecture.duration}</Text>
      </View>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{lecture.number}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Course Details Screen ────────────────────────────────────────────────────
export default function CourseDetailsScreen({ route, navigation }) {
  const { course }  = route.params;
  const lectures    = LECTURES(course.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading]           = useState(false);

  const handleGetCourse = () => setModalVisible(true);

  const handleVerify = async (code) => {
    setLoading(true);

    const result = await verifyCode(code);

    setLoading(false);

    if (result.success) {
      setModalVisible(false);
      navigation.navigate('LecturesList', { course });
    } else {
      Alert.alert('خطأ', result.message);
    }
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="تفاصيل الكورس"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Course Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: course.color }]}>
          <Text style={styles.heroEmoji}>{course.emoji}</Text>
          <Text style={styles.heroTitle}>{course.title}</Text>
          <Text style={styles.heroTeacher}>{course.teacher}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroPill}>
              <Ionicons name="play-circle-outline" size={14} color={COLORS.white} />
              <Text style={styles.heroPillText}>{course.lectures} محاضرة</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descCard}>
          <Text style={styles.descLabel}>عن الكورس</Text>
          <Text style={styles.descText}>{course.description}</Text>
        </View>

        {/* Lectures Preview */}
        <Text style={styles.sectionTitle}>المحاضرات</Text>
        {lectures.map((lecture) => (
          <LectureRow
            key={lecture.id}
            lecture={lecture}
            onPress={() => {
              if (lecture.isUnlocked) {
                navigation.navigate('LectureContent', { lecture, course });
              } else {
                setModalVisible(true);
              }
            }}
          />
        ))}

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Fixed CTA Button */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleGetCourse}
          activeOpacity={0.88}
        >
          <Text style={styles.ctaText}>الحصول على الكورس</Text>
        </TouchableOpacity>
      </View>

      {/* Secret Code Modal */}
      <SecretCodeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        loading={loading}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  heroCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
  },
  heroTeacher: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  heroPillText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  descCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  descLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'right',
    marginBottom: 8,
  },
  descText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'right',
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'right',
    marginBottom: 12,
  },
  lectureRow: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lectureInfo: {
    flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: 12,
  },
  lectureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  lectureDuration: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 3,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },

  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
  },
  ctaButton: {
    backgroundColor: COLORS.coral,
    borderRadius: 16,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
