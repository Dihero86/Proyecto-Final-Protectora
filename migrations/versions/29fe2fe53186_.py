"""empty message

Revision ID: 29fe2fe53186
Revises: c5fe480484d9
Create Date: 2023-04-29 10:28:08.688691

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29fe2fe53186'
down_revision = 'c5fe480484d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.alter_column('cif',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=199),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.alter_column('cif',
               existing_type=sa.String(length=199),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###