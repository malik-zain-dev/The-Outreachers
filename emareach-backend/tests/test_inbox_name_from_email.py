"""Tests for EmailService.get_inbox_name_from_email (warmup / placeholder sender names)."""

from services.email_service import EmailService


def test_glued_names_with_year_suffix():
    assert EmailService.get_inbox_name_from_email("adilsarwar2024@gmail.com") == "Adil Sarwar"
    assert EmailService.get_inbox_name_from_email("ritikmakhija2002@gmail.com") == "Ritik Makhija"


def test_long_brand_like_local_falls_back_to_single_token():
    assert EmailService.get_inbox_name_from_email("projectmartstore@gmail.com") == "Projectmartstore"


def test_separated_locals_unchanged():
    assert EmailService.get_inbox_name_from_email("john.doe@gmail.com") == "John Doe"
    assert EmailService.get_inbox_name_from_email("jane_smith@x.com") == "Jane Smith"
