import { supabase } from './supabase';

export async function verifyCode(code) {
  // ── 1. ابحث عن الكود وتحقق أنه غير مستخدم
  const { data, error } = await supabase
    .from('secret_codes')
    .select('*')
    .eq('code_value', code.trim())
    .eq('is_used', false)
    .single();

  if (error || !data) {
    return { success: false, message: 'الكود غير صحيح أو مستخدم مسبقاً' };
  }

  // ── 2. عدّل الكود: ضعه كمستخدم وسجّل وقت الاستخدام
  const { error: updateError } = await supabase
    .from('secret_codes')
    .update({
      is_used:     true,
      assigned_at: new Date().toISOString(),
    })
    .eq('id', data.id);

  if (updateError) {
    return { success: false, message: 'حدث خطأ أثناء التحقق، حاول مرة أخرى' };
  }

  return { success: true };
}
