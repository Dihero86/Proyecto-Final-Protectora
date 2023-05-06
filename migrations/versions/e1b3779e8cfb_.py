"""empty message

Revision ID: e1b3779e8cfb
Revises: 186acc5459ea
Create Date: 2023-05-05 10:56:48.628817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1b3779e8cfb'
down_revision = '186acc5459ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('historial', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=600),
               nullable=False)
        batch_op.create_unique_constraint(None, ['pet_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('historial', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=600),
               nullable=True)

    # ### end Alembic commands ###